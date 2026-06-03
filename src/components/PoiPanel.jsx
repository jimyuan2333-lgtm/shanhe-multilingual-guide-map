import { Filter, MapPin } from "./icons.jsx";
import { categoryOptions } from "../data/i18n.js";

export default function PoiPanel({
  lang,
  labels,
  selectedCategory,
  setSelectedCategory,
  searchResults,
  searchTerm,
  onSelectPoi
}) {
  return (
    <section className="panel poi-panel">
      <div className="panel-heading">
        <h2>{labels.filters}</h2>
        <Filter size={18} />
      </div>

      <div className="category-grid">
        {categoryOptions.map((item) => (
          <button
            key={item.key}
            className={selectedCategory === item.key ? "active" : ""}
            onClick={() => setSelectedCategory(item.key)}
          >
            {item[lang]}
          </button>
        ))}
      </div>

      {searchTerm.trim() && (
        <div className="search-results">
          <div className="mini-heading">
            <span>{labels.searchResults}</span>
            <b>{searchResults.length}</b>
          </div>
          <div className="scroll-list search-scroll">
            {searchResults.length === 0 && <p className="empty-state">{labels.noResults}</p>}
            {searchResults.map((item) => (
              <button key={item.id} onClick={() => onSelectPoi(item)} className="result-row">
                <MapPin size={15} />
                <span>{item.name[lang]}</span>
                <small>{item.name[lang === "zh" ? "en" : "zh"]}</small>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
