import { QrCode, Search, Sparkles } from "./icons.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

export default function Header({ lang, labels, searchTerm, setSearchTerm, setLang }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark">山</div>
        <div>
          <h1>{labels.appName}</h1>
          <p>{labels.appNameEn} · {labels.slogan}</p>
        </div>
      </div>

      <label className="search-box">
        <Search size={18} />
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={labels.search}
          autoComplete="off"
        />
      </label>

      <div className="header-actions">
        <LanguageSwitcher
          lang={lang}
          onChange={setLang}
          comingSoon={labels.comingSoon}
          comingSoonNotice={labels.comingSoonNotice}
        />
        <button className="ghost-button">
          <QrCode size={16} />
          {labels.qrGuide}
        </button>
        <button className="primary-button">
          <Sparkles size={16} />
          {labels.projectDemo}
        </button>
      </div>
    </header>
  );
}
