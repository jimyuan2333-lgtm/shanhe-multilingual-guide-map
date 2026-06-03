import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import PoiPanel from "./components/PoiPanel.jsx";
import RoutePanel from "./components/RoutePanel.jsx";
import FacilityPanel from "./components/FacilityPanel.jsx";
import GuideMap from "./components/GuideMap.jsx";
import DetailPanel from "./components/DetailPanel.jsx";
import Legend from "./components/Legend.jsx";
import QrMock from "./components/QrMock.jsx";
import ProductValue from "./components/ProductValue.jsx";
import { pois } from "./data/pois.js";
import { facilities } from "./data/facilities.js";
import { recommendRules, routes } from "./data/routes.js";
import { copy } from "./data/i18n.js";
import {
  facilityAliases,
  getReadableType,
  normalizeKeywords,
  normalizeOpen,
  parseDistanceMeters,
  poiAliases
} from "./data/mapMeta.js";
import { facilityTypeLabels } from "./data/facilities.js";

const currentLocationId = "visitor_center";

const walkableSegments = [
  [[19, 72], [22, 68], [28, 63], [35, 58], [42, 55], [48, 52], [56, 56], [60, 49], [68, 51], [77, 53]],
  [[28, 63], [32, 47], [36, 40], [42, 36], [48, 31]],
  [[48, 52], [50, 45], [52, 39], [56, 37], [62, 27], [66, 18], [76, 18], [78, 12], [82, 16]],
  [[41, 55], [43, 62], [47, 67], [54, 70], [60, 69], [66, 62], [72, 56], [77, 53]],
  [[47, 67], [52, 62], [56, 56], [60, 49]],
  [[60, 49], [66, 46], [72, 44], [82, 40]],
  [[47, 67], [42, 70], [38, 72], [32, 70], [24, 75], [19, 72]],
  [[60, 69], [68, 72], [76, 79], [84, 76], [80, 78], [71, 82], [60, 78], [48, 72], [39, 70]]
];

function pointKey(point) {
  return `${Number(point[0]).toFixed(2)},${Number(point[1]).toFixed(2)}`;
}

function distance(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function addGraphEdge(graph, a, b) {
  const aKey = pointKey(a);
  const bKey = pointKey(b);
  if (!graph.has(aKey)) graph.set(aKey, { point: a, links: [] });
  if (!graph.has(bKey)) graph.set(bKey, { point: b, links: [] });
  const weight = distance(a, b);
  graph.get(aKey).links.push({ key: bKey, weight });
  graph.get(bKey).links.push({ key: aKey, weight });
}

function nearestGraphKey(graph, point) {
  let best = null;
  for (const [key, node] of graph.entries()) {
    const score = distance(point, node.point);
    if (!best || score < best.score) best = { key, score };
  }
  return best?.key;
}

function buildNavigationPath(from, to) {
  const graph = new Map();
  walkableSegments.forEach((segment) => {
    for (let index = 0; index < segment.length - 1; index += 1) addGraphEdge(graph, segment[index], segment[index + 1]);
  });
  const fromPoint = [from.x, from.y];
  const toPoint = [to.x, to.y];
  const fromAnchor = nearestGraphKey(graph, fromPoint);
  const toAnchor = nearestGraphKey(graph, toPoint);
  if (!fromAnchor || !toAnchor) return [];
  addGraphEdge(graph, fromPoint, graph.get(fromAnchor).point);
  addGraphEdge(graph, toPoint, graph.get(toAnchor).point);

  const start = pointKey(fromPoint);
  const end = pointKey(toPoint);
  const distances = new Map([[start, 0]]);
  const previous = new Map();
  const queue = new Set(graph.keys());

  while (queue.size) {
    let current = null;
    let currentDistance = Infinity;
    for (const key of queue) {
      const value = distances.get(key) ?? Infinity;
      if (value < currentDistance) {
        current = key;
        currentDistance = value;
      }
    }
    if (!current || current === end) break;
    queue.delete(current);
    for (const link of graph.get(current).links) {
      if (!queue.has(link.key)) continue;
      const nextDistance = currentDistance + link.weight;
      if (nextDistance < (distances.get(link.key) ?? Infinity)) {
        distances.set(link.key, nextDistance);
        previous.set(link.key, current);
      }
    }
  }

  const keys = [];
  let cursor = end;
  while (cursor) {
    keys.unshift(cursor);
    if (cursor === start) break;
    cursor = previous.get(cursor);
  }
  return keys.map((key) => graph.get(key).point);
}

function normalizeItem(item) {
  const aliases = item.distance
    ? [...(facilityAliases[item.type] || []), item.name.zh, item.name.en]
    : [...(poiAliases[item.id] || []), item.name.zh, item.name.en];
  return {
    ...item,
    open: normalizeOpen(item.open),
    keywords: normalizeKeywords(item.keywords),
    aliases
  };
}

const normalizedPois = pois.map(normalizeItem);
const normalizedFacilities = facilities.map(normalizeItem);
const allMapItems = [...normalizedPois, ...normalizedFacilities];

function categoryMatches(poi, selectedCategory) {
  if (selectedCategory === "all") return true;
  if (selectedCategory === "attractions") return poi.category?.includes("attractions");
  if (selectedCategory === "facilities") return Boolean(poi.distance) || poi.category?.includes("facilities");
  return poi.category?.includes(selectedCategory) || poi.type?.includes(selectedCategory);
}

function searchMatchesPoi(poi, term) {
  if (!term.trim()) return false;
  const tokens = term.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const keywords = Array.isArray(poi.keywords) ? poi.keywords : [...(poi.keywords?.zh || []), ...(poi.keywords?.en || [])];
  const haystack = [
    poi.name.zh,
    poi.name.en,
    poi.type,
    getReadableType(poi, "zh", facilityTypeLabels),
    getReadableType(poi, "en", facilityTypeLabels),
    ...(poi.category || []),
    poi.intro?.zh,
    poi.intro?.en,
    ...(poi.aliases || []),
    ...keywords
  ].filter(Boolean).join(" ").toLowerCase();
  return tokens.every((token) => haystack.includes(token));
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const labels = copy[lang];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPoi, setSelectedPoi] = useState(() => allMapItems.find((poi) => poi.id === "opera_house"));
  const [activeRoute, setActiveRoute] = useState(null);
  const [audioState, setAudioState] = useState({ id: null, playing: false });
  const [viewRequest, setViewRequest] = useState({ type: "fit-map", nonce: 0 });
  const [navigationTarget, setNavigationTarget] = useState(null);
  const [myRoute, setMyRoute] = useState([]);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [mobilePanel, setMobilePanel] = useState("details");
  const [mobileSheetCollapsed, setMobileSheetCollapsed] = useState(false);
  const [sheetTouchStart, setSheetTouchStart] = useState(null);
  const [recommendation, setRecommendation] = useState({
    duration: labels.durations[1],
    visitor: labels.visitors[0],
    interest: labels.interests[0]
  });
  const [generated, setGenerated] = useState(null);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allMapItems.filter((poi) => searchMatchesPoi(poi, searchTerm));
  }, [searchTerm]);

  const searchMatchIds = useMemo(() => new Set(searchResults.map((poi) => poi.id)), [searchResults]);

  const requestView = (request) => {
    setViewRequest({ ...request, nonce: Date.now() + Math.random() });
  };

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(null), 2400);
  };

  const handleSelectPoi = (poi, options = {}) => {
    setSelectedPoi(poi);
    setMobilePanel("details");
    setMobileSheetCollapsed(false);
    setIsMapFullscreen(false);
    if (options.focus !== false) {
      requestView({ type: "point", id: poi.id, scale: poi.distance ? 2.05 : 1.75 });
    }
  };

  const handlePlayAudio = (poi) => {
    setAudioState((current) => ({
      id: poi.id,
      playing: current.id === poi.id ? !current.playing : true,
      progress: current.id === poi.id ? current.progress || 42 : 42
    }));
  };

  const handleStartNavigation = (poi) => {
    const from = allMapItems.find((item) => item.id === currentLocationId);
    if (!from || !poi) return;
    const dx = poi.x - from.x;
    const dy = poi.y - from.y;
    const approxMeters = Math.round(Math.sqrt(dx * dx + dy * dy) * 55);
    const minutes = Math.max(3, Math.round(approxMeters / 75));
    setNavigationTarget({
      fromId: currentLocationId,
      toId: poi.id,
      distance: { zh: `${approxMeters}米`, en: `${approxMeters} m` },
      time: { zh: `${minutes}分钟`, en: `${minutes} min` },
      path: buildNavigationPath(from, poi)
    });
    setMobileSheetCollapsed(true);
    requestView({ type: "bounds", points: [[from.x, from.y], [poi.x, poi.y]], padding: 0.7 });
    showToast(labels.plannedRoute);
  };

  const handleAddToRoute = (poi) => {
    setMyRoute((current) => current.some((item) => item.id === poi.id) ? current : [...current, poi]);
    showToast(labels.addedToRoute);
  };

  const handleBilingualIntro = (poi) => {
    setModal({ type: "bilingual", poi });
  };

  const handleShareCard = (poi) => {
    setModal({ type: "share", poi });
  };

  const handleGenerate = () => {
    const choices = [recommendation.duration, recommendation.visitor, recommendation.interest];
    const rule = recommendRules.find((item) => item.matches.some((match) => choices.includes(match))) || recommendRules[4];
    const route = routes.find((item) => item.id === rule.routeId) || routes[1];
    setActiveRoute(route);
    setMobilePanel("routes");
    setMobileSheetCollapsed(false);
    setIsMapFullscreen(false);
    requestView({ type: "route", route });
    setGenerated({ route, reason: rule.reason });
  };

  const handleRouteSelect = (route) => {
    setActiveRoute(route);
    setMobilePanel("routes");
    setMobileSheetCollapsed(true);
    requestView({ type: "route", route });
  };

  const toggleMapFullscreen = () => {
    setIsMapFullscreen((value) => {
      const next = !value;
      if (next) setMobileSheetCollapsed(true);
      return next;
    });
  };

  const handleAiEntry = () => {
    showToast(labels.aiComingSoon);
  };

  const toggleMobileSheet = () => {
    setMobileSheetCollapsed((value) => !value);
    if (isMapFullscreen) setIsMapFullscreen(false);
  };

  const handleSheetTouchStart = (event) => {
    setSheetTouchStart(event.touches[0]?.clientY ?? null);
  };

  const handleSheetTouchEnd = (event) => {
    if (sheetTouchStart == null) return;
    const scroller = event.target.closest?.(".mobile-sheet-content");
    if (scroller?.scrollTop > 8) {
      setSheetTouchStart(null);
      return;
    }
    const endY = event.changedTouches[0]?.clientY ?? sheetTouchStart;
    const delta = endY - sheetTouchStart;
    if (delta > 34) setMobileSheetCollapsed(true);
    if (delta < -34) {
      setMobileSheetCollapsed(false);
      if (isMapFullscreen) setIsMapFullscreen(false);
    }
    setSheetTouchStart(null);
  };

  const visibleCategoryFilter = (poi) => categoryMatches(poi, selectedCategory);
  const mobileTabs = [
    { key: "pois", label: lang === "zh" ? "景点" : "POI" },
    { key: "routes", label: lang === "zh" ? "路线" : "Routes" },
    { key: "facilities", label: lang === "zh" ? "设施" : "Facilities" },
    { key: "details", label: lang === "zh" ? "详情" : "Details" }
  ];
  const mobilePanelTitle = mobileTabs.find((item) => item.key === mobilePanel)?.label;

  return (
    <div className={[
      "app",
      isMapFullscreen ? "map-fullscreen-mode" : "",
      leftCollapsed ? "left-collapsed" : "",
      rightCollapsed ? "right-collapsed" : "",
      mobileSheetCollapsed ? "mobile-sheet-collapsed" : ""
    ].join(" ")}>
      <Header
        lang={lang}
        labels={labels}
        searchTerm={searchTerm}
        setSearchTerm={(value) => {
          setSearchTerm(value);
          if (value.trim()) {
            setMobilePanel("pois");
            setMobileSheetCollapsed(false);
            setIsMapFullscreen(false);
          }
        }}
        setLang={(nextLang) => {
          setLang(nextLang);
          setRecommendation({
            duration: copy[nextLang].durations[1],
            visitor: copy[nextLang].visitors[0],
            interest: copy[nextLang].interests[0]
          });
          setGenerated(null);
        }}
      />

      <main className="workspace">
        <aside className={`left-column ${leftCollapsed ? "collapsed" : ""}`}>
          <button className="panel-toggle floating-toggle" onClick={() => setLeftCollapsed((value) => !value)}>
            {leftCollapsed ? labels.showLeft : labels.collapseLeft}
          </button>
          <PoiPanel
            lang={lang}
            labels={labels}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchResults={searchResults}
            searchTerm={searchTerm}
            onSelectPoi={(poi) => handleSelectPoi(poi)}
          />
          <RoutePanel
            lang={lang}
            labels={labels}
            routes={routes}
            activeRoute={activeRoute}
            setActiveRoute={handleRouteSelect}
            recommendation={recommendation}
            setRecommendation={setRecommendation}
            generated={generated}
            onGenerate={handleGenerate}
          />
          <FacilityPanel
            lang={lang}
            labels={labels}
            facilities={normalizedFacilities}
            onSelectPoi={(poi) => handleSelectPoi(poi)}
            onNavigate={handleStartNavigation}
          />
        </aside>

        <section className="center-column">
          <GuideMap
            lang={lang}
            labels={labels}
            pois={allMapItems}
            routes={routes}
            activeRoute={activeRoute}
            selectedPoi={selectedPoi}
            onSelectPoi={handleSelectPoi}
            searchMatches={searchMatchIds}
            categoryFilter={visibleCategoryFilter}
            viewRequest={viewRequest}
            navigationTarget={navigationTarget}
            currentLocationId={currentLocationId}
            isFullscreen={isMapFullscreen}
            onToggleFullscreen={toggleMapFullscreen}
            onAskAi={handleAiEntry}
          />
          <div className="bottom-dock">
            <Legend labels={labels} />
            {activeRoute && (
              <div className="active-route-strip" style={{ "--route-color": activeRoute.color }}>
                <strong>{labels.routeNodes}: {activeRoute.name[lang]}</strong>
                <div className="route-timeline" aria-label={labels.routeTimeline}>
                  {activeRoute.nodes.map((id, index) => {
                    const item = allMapItems.find((poi) => poi.id === id);
                    if (!item) return null;
                    return (
                      <button key={`${id}-${index}`} onClick={() => handleSelectPoi(item)}>
                        <b>{index + 1}</b>
                        <span>{item.name[lang]}</span>
                      </button>
                    );
                  })}
                </div>
                <small>{labels.routeFeature}: {activeRoute.feature[lang]}</small>
              </div>
            )}
          </div>
        </section>

        <aside className={`right-column ${rightCollapsed ? "collapsed" : ""}`}>
          <button className="panel-toggle floating-toggle" onClick={() => setRightCollapsed((value) => !value)}>
            {rightCollapsed ? labels.showRight : labels.collapseRight}
          </button>
          <DetailPanel
            lang={lang}
            labels={labels}
            selectedPoi={selectedPoi}
            audioState={audioState}
            onPlayAudio={handlePlayAudio}
            onStartNavigation={handleStartNavigation}
            onAddToRoute={handleAddToRoute}
            onBilingualIntro={handleBilingualIntro}
            onShareCard={handleShareCard}
            navigationTarget={navigationTarget}
            myRoute={myRoute}
          />
          <ProductValue labels={labels} />
          <QrMock labels={labels} />
        </aside>
      </main>

      <section
        className="mobile-bottom-sheet"
        aria-label="mobile guide controls"
        onTouchStart={handleSheetTouchStart}
        onTouchEnd={handleSheetTouchEnd}
      >
        <button className="mobile-grabber" onClick={toggleMobileSheet} aria-label="Toggle map panel" />
        <nav className="mobile-tabs">
          {mobileTabs.map((item) => (
            <button
              key={item.key}
              className={mobilePanel === item.key ? "active" : ""}
              onClick={() => {
                setMobilePanel(item.key);
                setMobileSheetCollapsed(false);
                if (isMapFullscreen) setIsMapFullscreen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mobile-sheet-title">{mobilePanelTitle}</div>
        <div className="mobile-sheet-content">
          {mobilePanel === "pois" && (
            <PoiPanel
              lang={lang}
              labels={labels}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchResults={searchResults}
              searchTerm={searchTerm}
              onSelectPoi={(poi) => handleSelectPoi(poi)}
            />
          )}
          {mobilePanel === "routes" && (
            <RoutePanel
              lang={lang}
              labels={labels}
              routes={routes}
              activeRoute={activeRoute}
              setActiveRoute={handleRouteSelect}
              recommendation={recommendation}
              setRecommendation={setRecommendation}
              generated={generated}
              onGenerate={handleGenerate}
            />
          )}
          {mobilePanel === "facilities" && (
            <FacilityPanel
              lang={lang}
              labels={labels}
              facilities={normalizedFacilities}
              onSelectPoi={(poi) => handleSelectPoi(poi)}
              onNavigate={handleStartNavigation}
            />
          )}
          {mobilePanel === "details" && (
            <DetailPanel
              lang={lang}
              labels={labels}
              selectedPoi={selectedPoi}
              audioState={audioState}
              onPlayAudio={handlePlayAudio}
              onStartNavigation={handleStartNavigation}
              onAddToRoute={handleAddToRoute}
              onBilingualIntro={handleBilingualIntro}
              onShareCard={handleShareCard}
              navigationTarget={navigationTarget}
              myRoute={myRoute}
            />
          )}
        </div>
      </section>

      {toast && <div className="toast">{toast}</div>}

      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <section className="demo-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>{labels.close}</button>
            {modal.type === "bilingual" && (
              <>
                <h2>{labels.bilingualIntro}</h2>
                <div className="bilingual-grid">
                  <article>
                    <strong>中文</strong>
                    <h3>{modal.poi.name.zh}</h3>
                    <p>{modal.poi.intro.zh}</p>
                  </article>
                  <article>
                    <strong>English</strong>
                    <h3>{modal.poi.name.en}</h3>
                    <p>{modal.poi.intro.en}</p>
                  </article>
                </div>
              </>
            )}
            {modal.type === "share" && (
              <>
                <h2>{labels.shareCard}</h2>
                <div className="share-card-preview">
                  <div>
                    <span>Shanhe Ancient Town</span>
                    <h3>{modal.poi.name[lang]}</h3>
                    <p>{modal.poi.intro[lang]}</p>
                    <small>{modal.poi.name.zh} / {modal.poi.name.en}</small>
                  </div>
                  <div className="qr-fake compact">
                    {Array.from({ length: 64 }).map((_, index) => (
                      <span key={index} className={(index * 5 + index / 3) % 4 < 1.8 ? "dark" : ""} />
                    ))}
                  </div>
                </div>
                <button className="primary-button">{labels.shareNow}</button>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
