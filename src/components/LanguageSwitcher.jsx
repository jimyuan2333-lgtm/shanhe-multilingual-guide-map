const languageOptions = [
  { key: "zh", label: "中文" },
  { key: "en", label: "English" },
  { key: "ja", label: "日本語" },
  { key: "ko", label: "한국어" },
  { key: "fr", label: "Français" },
  { key: "de", label: "Deutsch" },
  { key: "ru", label: "Русский" },
  { key: "hi", label: "हिन्दी" },
  { key: "ar", label: "العربية" },
  { key: "th", label: "ไทย" }
];

export default function LanguageSwitcher({ lang, onChange }) {
  return (
    <div className="language-switcher" aria-label="language switcher">
      {languageOptions.map((item) => (
        <button
          key={item.key}
          className={lang === item.key ? "active" : ""}
          title={item.label}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
