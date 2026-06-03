import {
  Accessibility,
  Bed,
  Camera,
  Car,
  Coffee,
  HeartPulse,
  Landmark,
  LocateFixed,
  MapPin,
  Minus,
  Navigation,
  Plus,
  RotateCcw,
  ShieldCheck,
  Ticket,
  Trees,
  Utensils,
  Waves,
  Zap
} from "./icons.jsx";

const MAP_WIDTH = 1600;
const MAP_HEIGHT = 1200;

function getZoomLevel(scale) {
  if (scale < 1.35) return 1;
  if (scale < 1.9) return 2;
  return 3;
}

function getIcon(type) {
  const normalized = type?.split("/")?.[0];
  const icons = {
    service: MapPin,
    attraction: Landmark,
    culture: Landmark,
    performance: Landmark,
    heritage: Landmark,
    waterfront: Waves,
    landmark: Landmark,
    transport: Navigation,
    nature: Trees,
    dining: Utensils,
    shopping: Coffee,
    accommodation: Bed,
    photo: Camera,
    restroom: Accessibility,
    parking: Car,
    firstAid: HeartPulse,
    security: ShieldCheck,
    charging: Zap,
    nursing: HeartPulse,
    accessible: Accessibility,
    ticket: Ticket
  };
  return icons[normalized] || MapPin;
}

export default function GuideMap({
  lang,
  labels,
  pois,
  routes,
  activeRoute,
  selectedPoi,
  onSelectPoi,
  searchMatches,
  categoryFilter,
  zoom,
  setZoom,
  pan,
  setPan
}) {
  const zoomLevel = getZoomLevel(zoom);

  const routePoiIds = new Set(activeRoute.nodes);
  const visiblePois = pois.filter((poi) => {
    const isSearchMatch = searchMatches.has(poi.id);
    const inRoute = routePoiIds.has(poi.id);
    const isSelected = selectedPoi?.id === poi.id;
    const passesCategory = categoryFilter(poi);
    return passesCategory && (poi.level <= zoomLevel || isSearchMatch || inRoute || isSelected);
  });

  const pointsById = new Map(pois.map((poi) => [poi.id, poi]));

  const clampZoom = (value) => Math.min(2.55, Math.max(0.82, Number(value.toFixed(2))));

  const zoomBy = (delta) => {
    setZoom((current) => clampZoom(current + delta));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const locateMe = () => {
    const scale = 1.55;
    setZoom(scale);
    setPan({ x: -125, y: -455 });
    const visitorCenter = pointsById.get("visitor_center");
    if (visitorCenter) onSelectPoi(visitorCenter);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.12 : 0.12;
    setZoom((current) => clampZoom(current + delta));
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
    event.currentTarget.dataset.startX = String(event.clientX);
    event.currentTarget.dataset.startY = String(event.clientY);
    event.currentTarget.dataset.panX = String(pan.x);
    event.currentTarget.dataset.panY = String(pan.y);
  };

  const handlePointerMove = (event) => {
    if (event.currentTarget.dataset.dragging !== "true") return;
    const startX = Number(event.currentTarget.dataset.startX);
    const startY = Number(event.currentTarget.dataset.startY);
    const panX = Number(event.currentTarget.dataset.panX);
    const panY = Number(event.currentTarget.dataset.panY);
    setPan({ x: panX + event.clientX - startX, y: panY + event.clientY - startY });
  };

  const handlePointerUp = (event) => {
    event.currentTarget.dataset.dragging = "false";
  };

  return (
    <section className="map-shell">
      <div className="map-toolbar">
        <button onClick={() => zoomBy(0.18)} title="Zoom in"><Plus size={17} /></button>
        <button onClick={() => zoomBy(-0.18)} title="Zoom out"><Minus size={17} /></button>
        <button onClick={resetView} title={labels.reset}><RotateCcw size={17} />{labels.reset}</button>
        <button onClick={locateMe} title={labels.locateMe}><LocateFixed size={17} />{labels.locateMe}</button>
      </div>

      <div
        className="map-viewport"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="map-canvas"
          style={{
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
          }}
        >
          <img src="/assets/shanhe-map.png" alt="Shanhe Ancient Town base map" draggable="false" />

          <svg className="route-layer" viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}>
            <polyline
              className="main-road-line"
              points="310,880 430,740 560,660 720,610 890,650 1080,610 1260,650"
            />
            <polyline
              className="secondary-road-line"
              points="420,620 520,480 750,380 1010,300 1250,200"
            />
            <polyline
              className="walking-line"
              points="820,530 960,310 1120,230 1250,140 1420,210"
            />
            <polyline
              className="riverside-line"
              points="760,800 900,790 1070,680 1160,560 1280,500"
            />
            {routes.map((route) => {
              const coordinates = route.nodes
                .map((id) => pointsById.get(id))
                .filter(Boolean)
                .map((poi) => `${(poi.x / 100) * MAP_WIDTH},${(poi.y / 100) * MAP_HEIGHT}`)
                .join(" ");
              return (
                <polyline
                  key={route.id}
                  className={route.id === activeRoute.id ? "route-path active" : "route-path"}
                  points={coordinates}
                  stroke={route.color}
                />
              );
            })}
          </svg>

          <div className="you-are-here" style={{ left: "20.5%", top: "69.5%" }}>
            <span>{labels.youAreHere}</span>
          </div>

          {visiblePois.map((poi) => {
            const Icon = getIcon(poi.type);
            const isMatch = searchMatches.has(poi.id);
            const isSelected = selectedPoi?.id === poi.id;
            const inRoute = routePoiIds.has(poi.id);
            return (
              <button
                key={poi.id}
                className={[
                  "poi-marker",
                  poi.distance ? "facility" : "place",
                  poi.type.split("/")[0],
                  isSelected ? "selected" : "",
                  isMatch ? "search-match" : "",
                  inRoute ? "in-route" : ""
                ].join(" ")}
                style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelectPoi(poi);
                }}
                onPointerDown={(event) => event.stopPropagation()}
                title={`${poi.name.zh} / ${poi.name.en}`}
              >
                <Icon size={zoomLevel === 1 ? 14 : 16} />
                {(zoomLevel >= 2 || isSelected || isMatch) && <span>{poi.name[lang]}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="zoom-badge">
        {labels.zoomLevel} {zoomLevel} / 3
      </div>
    </section>
  );
}
