import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const port = Number(process.env.PORT || 5173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".jsx": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function toFilePath(requestUrl) {
  const parsed = new URL(requestUrl || "/", "http://localhost").pathname;
  const cleanPath = decodeURIComponent(parsed === "/" ? "/index.html" : parsed);
  const publicPath = cleanPath.startsWith("/assets/")
    ? path.join(root, "public", cleanPath)
    : path.join(root, cleanPath);
  const resolved = publicPath;
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function rewriteImports(code) {
  return code
    .replaceAll('from "react"', 'from "/assets/react.mjs"')
    .replaceAll("from 'react'", "from '/assets/react.mjs'")
    .replaceAll('from "react-dom/client"', 'from "/assets/react-dom-client.mjs"')
    .replaceAll("from 'react-dom/client'", "from '/assets/react-dom-client.mjs'")
    .replaceAll('from "lucide-react"', 'from "/assets/lucide-react.mjs"')
    .replaceAll("from 'lucide-react'", "from '/assets/lucide-react.mjs'")
    .replace(/from\s+["'](\.{1,2}\/[^"']+)\.jsx["']/g, 'from "$1.js"');
}

async function serveFile(filePath, response) {
  const extension = path.extname(filePath);
  let contents = await fs.readFile(filePath);

  if (extension === ".jsx") {
    const source = rewriteImports(contents.toString("utf8"));
    const withReactImport = /\bimport\s+React\b/.test(source)
      ? source
      : `import React from "/assets/react.mjs";\n${source}`;
    const result = ts.transpileModule(withReactImport, {
      compilerOptions: {
        jsx: ts.JsxEmit.React,
        module: ts.ModuleKind.ES2022,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true
      },
      fileName: filePath
    });
    contents = Buffer.from(result.outputText, "utf8");
  }

  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  response.end(contents);
}

async function checkSources() {
  const entries = await fs.readdir(path.join(root, "src"), { recursive: true });
  const jsxFiles = entries.filter((entry) => entry.endsWith(".jsx"));
  for (const entry of jsxFiles) {
    const filePath = path.join(root, "src", entry);
    const source = rewriteImports(await fs.readFile(filePath, "utf8"));
    const withReactImport = /\bimport\s+React\b/.test(source)
      ? source
      : `import React from "/assets/react.mjs";\n${source}`;
    const result = ts.transpileModule(withReactImport, {
      reportDiagnostics: true,
      compilerOptions: {
        jsx: ts.JsxEmit.React,
        module: ts.ModuleKind.ES2022,
        target: ts.ScriptTarget.ES2022
      },
      fileName: filePath
    });
    const diagnostics = result.diagnostics || [];
    if (diagnostics.length) {
      for (const diagnostic of diagnostics) {
        console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
      }
      process.exit(1);
    }
  }
  console.log(`Checked ${jsxFiles.length} React source files.`);
}

if (process.argv.includes("--check")) {
  await checkSources();
  process.exit(0);
}

const server = http.createServer(async (request, response) => {
  try {
    const filePath = toFilePath(request.url);
    if (!filePath) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    try {
      await serveFile(filePath, response);
    } catch (error) {
      if (error.code === "ENOENT" && filePath.endsWith(".js")) {
        await serveFile(filePath.replace(/\.js$/, ".jsx"), response);
        return;
      }
      throw error;
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(500);
    response.end(String(error.stack || error));
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Shanhe guide map demo running at http://localhost:${port}`);
});
