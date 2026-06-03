import { useMemo, useState } from "react";
import {
  Accessibility,
  Bed,
  Camera,
  Car,
  Coffee,
  HeartPulse,
  Info,
  Navigation,
  ShieldCheck,
  Ticket,
  Utensils,
  Zap
} from "./icons.jsx";
import { facilityTypeLabels } from "../data/facilities.js";
import { parseDistanceMeters } from "../data/mapMeta.js";

const facilityFilters = [
  { key: "all", label: { zh: "全部", en: "All" } },
  { key: "restroom", label: { zh: "卫生间", en: "Restroom" } },
  { key: "parking", label: { zh: "停车场", en: "Parking" } },
  { key: "firstAid", label: { zh: "急救点", en: "First Aid" } },
  { key: "security", label: { zh: "安保点", en: "Security" } },
  { key: "charging", label: { zh: "充电站", en: "Charging" } },
  { key: "nursing", label: { zh: "母婴室", en: "Nursing Room" } },
  { key: "accessible", label: { zh: "无障碍", en: "Accessible" } },
  { key: "dining", label: { zh: "餐饮", en: "Dining" } },
  { key: "accommodation", label: { zh: "住宿", en: "Accommodation" } }
];

const facilityIcons = {
  restroom: Accessibility,
  parking: Car,
  service: Info,
  firstAid: HeartPulse,
  security: ShieldCheck,
  charging: Zap,
  nursing: HeartPulse,
  accessible: Accessibility,
  ticket: Ticket,
  photo: Camera,
  dining: Utensils,
  accommodation: Bed,
  transport: Navigation,
  shopping: Coffee
};

export default function FacilityPanel({ lang, labels, facilities, onSelectPoi, onNavigate }) {
  const [typeFilter, setTypeFilter] = useState("all");
  const listed = useMemo(() => {
    return facilities
      .filter((item) => typeFilter === "all" || item.type === typeFilter)
      .slice()
      .sort((a, b) => parseDistanceMeters(a.distance) - parseDistanceMeters(b.distance));
  }, [facilities, typeFilter]);

  return (
    <section className="panel facility-panel">
      <div className="panel-heading">
        <h2>{typeFilter === "all" ? labels.nearestFacilities : labels.facilities}</h2>
      </div>
      <div className="facility-filter-row">
        {facilityFilters.map((item) => (
          <button
            key={item.key}
            className={typeFilter === item.key ? "active" : ""}
            onClick={() => setTypeFilter(item.key)}
          >
            {item.label[lang]}
          </button>
        ))}
      </div>
      <div className="facility-list scroll-list">
        {listed.map((item) => {
          const Icon = facilityIcons[item.type] || Info;
          return (
            <article key={item.id} className="facility-card">
              <button className="facility-card-main" onClick={() => onSelectPoi(item)}>
                <span className={`facility-mini ${item.type}`}><Icon size={14} /></span>
                <span>
                  <strong>{item.name[lang]}</strong>
                  <small>{facilityTypeLabels[item.type]?.[lang] || item.type} · {item.distance[lang]}</small>
                  <em>{item.status[lang]}</em>
                </span>
              </button>
              <button className="tiny-nav" onClick={() => onNavigate(item)}>
                <Navigation size={14} />
                {labels.startNav}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
