export function text(value, lang, fallback = "") {
  if (value == null) return fallback;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value;
  return value[lang] ?? value.en ?? value.zh ?? fallback;
}

export function textArray(value, lang) {
  const result = text(value, lang, []);
  if (Array.isArray(result)) return result;
  return result ? [result] : [];
}
