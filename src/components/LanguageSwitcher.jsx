import { Languages } from "./icons.jsx";

const languageOptions = [
  { key: "zh", label: "中文" },
  { key: "en", label: "English" },
  { key: "ja", label: "日本語" },
  { key: "ko", label: "한국어" },
  { key: "fr", label: "Français" }
];

export default function LanguageSwitcher({ lang, onChange, comingSoon }) {
  return (
    <div className="language-switcher" aria-label="language switcher">
      <Languages size={16} />
      {languageOptions.map((item) => (
        <button
          key={item.key}
          className={lang === item.key ? "active" : ""}
          title={item.key === "zh" || item.key === "en" ? item.label : comingSoon}
          onClick={() => {
            if (item.key === "zh" || item.key === "en") onChange(item.key);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
