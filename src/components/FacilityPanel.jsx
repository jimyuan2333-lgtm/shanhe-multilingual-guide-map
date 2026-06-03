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
import { text } from "../utils/lang.js";

const facilityFilters = [
  { key: "all", label: { zh: "全部", en: "All", ja: "すべて", ko: "전체", fr: "Tout", de: "Alle", ru: "Все", hi: "सभी", ar: "الكل", th: "ทั้งหมด" } },
  { key: "restroom", label: { zh: "卫生间", en: "Restroom", ja: "トイレ", ko: "화장실", fr: "Toilettes", de: "WC", ru: "Туалет", hi: "शौचालय", ar: "دورات المياه", th: "ห้องน้ำ" } },
  { key: "parking", label: { zh: "停车场", en: "Parking", ja: "駐車場", ko: "주차장", fr: "Parking", de: "Parkplatz", ru: "Парковка", hi: "पार्किंग", ar: "موقف سيارات", th: "ที่จอดรถ" } },
  { key: "firstAid", label: { zh: "急救点", en: "First Aid", ja: "救護所", ko: "응급처치", fr: "Premiers secours", de: "Erste Hilfe", ru: "Первая помощь", hi: "प्राथमिक उपचार", ar: "إسعاف أولي", th: "ปฐมพยาบาล" } },
  { key: "security", label: { zh: "安保点", en: "Security", ja: "警備", ko: "보안", fr: "Sécurité", de: "Sicherheit", ru: "Охрана", hi: "सुरक्षा", ar: "الأمن", th: "รักษาความปลอดภัย" } },
  { key: "charging", label: { zh: "充电站", en: "Charging", ja: "充電", ko: "충전", fr: "Recharge", de: "Laden", ru: "Зарядка", hi: "चार्जिंग", ar: "شحن", th: "ชาร์จไฟ" } },
  { key: "nursing", label: { zh: "母婴室", en: "Nursing Room", ja: "授乳室", ko: "수유실", fr: "Salle bébé", de: "Stillraum", ru: "Комната матери и ребенка", hi: "शिशु कक्ष", ar: "غرفة رعاية الأطفال", th: "ห้องแม่และเด็ก" } },
  { key: "accessible", label: { zh: "无障碍", en: "Accessible", ja: "バリアフリー", ko: "무장애", fr: "Accessible", de: "Barrierefrei", ru: "Доступная среда", hi: "सुगम", ar: "مرافق ميسرة", th: "รองรับผู้พิการ" } },
  { key: "dining", label: { zh: "餐饮", en: "Dining", ja: "飲食", ko: "식음료", fr: "Restauration", de: "Gastronomie", ru: "Питание", hi: "भोजन", ar: "مطاعم", th: "อาหาร" } },
  { key: "accommodation", label: { zh: "住宿", en: "Accommodation", ja: "宿泊", ko: "숙박", fr: "Hébergement", de: "Unterkunft", ru: "Проживание", hi: "आवास", ar: "إقامة", th: "ที่พัก" } }
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
            {text(item.label, lang)}
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
                  <strong>{text(item.name, lang)}</strong>
                  <small>{text(facilityTypeLabels[item.type], lang, item.type)} · {text(item.distance, lang)}</small>
                  <em>{text(item.status, lang)}</em>
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
