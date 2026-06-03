import { facilityTypeLabels } from "../data/facilities.js";

export default function FacilityPanel({ lang, labels, facilities, onSelectPoi }) {
  const featured = facilities.slice(0, 7);

  return (
    <section className="panel facility-panel">
      <div className="panel-heading">
        <h2>{labels.facilities}</h2>
      </div>
      <div className="facility-list">
        {featured.map((item) => (
          <button key={item.id} onClick={() => onSelectPoi(item)}>
            <span className={`facility-mini ${item.type}`} />
            <span>
              <strong>{item.name[lang]}</strong>
              <small>{facilityTypeLabels[item.type]?.[lang] || item.type} · {item.distance[lang]}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
