import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const dist = path.join(root, "dist");

function rewriteImports(code) {
  return code
    .replaceAll('from "react"', 'from "/assets/react.mjs"')
    .replaceAll("from 'react'", "from '/assets/react.mjs'")
    .replaceAll('from "react-dom/client"', 'from "/assets/react-dom-client.mjs"')
    .replaceAll("from 'react-dom/client'", "from '/assets/react-dom-client.mjs'")
    .replace(/from\s+["'](\.{1,2}\/[^"']+)\.jsx["']/g, 'from "$1.js"');
}

async function copyDirectory(from, to) {
  await fs.mkdir(to, { recursive: true });
  const entries = await fs.readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(source, target);
    } else {
      await fs.copyFile(source, target);
    }
  }
}

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function build() {
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(path.join(dist, "src"), { recursive: true });

  await copyDirectory(path.join(root, "public"), dist);

  const html = await fs.readFile(path.join(root, "index.html"), "utf8");
  await fs.writeFile(path.join(dist, "index.html"), html, "utf8");

  const sourceFiles = await walkFiles(path.join(root, "src"));
  for (const sourceFile of sourceFiles) {
    const relative = path.relative(path.join(root, "src"), sourceFile);
    const extension = path.extname(sourceFile);
    const outputRelative = extension === ".jsx"
      ? relative.replace(/\.jsx$/, ".js")
      : relative;
    const outputFile = path.join(dist, "src", outputRelative);
    await fs.mkdir(path.dirname(outputFile), { recursive: true });

    if (extension === ".jsx") {
      const source = rewriteImports(await fs.readFile(sourceFile, "utf8"));
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
        fileName: sourceFile
      });
      const diagnostics = result.diagnostics || [];
      if (diagnostics.length) {
        for (const diagnostic of diagnostics) {
          console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
        process.exit(1);
      }
      await fs.writeFile(outputFile, result.outputText, "utf8");
    } else {
      const contents = extension === ".js"
        ? rewriteImports(await fs.readFile(sourceFile, "utf8"))
        : await fs.readFile(sourceFile);
      await fs.writeFile(outputFile, contents);
    }
  }

  console.log("Built static site to dist/.");
}

await build();
