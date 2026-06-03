import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import PoiPanel from "./components/PoiPanel.jsx";
import RoutePanel from "./components/RoutePanel.jsx";
import FacilityPanel from "./components/FacilityPanel.jsx";
import GuideMap from "./components/GuideMap.jsx";
import DetailPanel from "./components/DetailPanel.jsx";
import Legend from "./components/Legend.jsx";
import QrMock from "./components/QrMock.jsx";
import ProductValue from "./components/ProductValue.jsx";
import { pois as richPois } from "./data/pois.js";
import { facilities as richFacilities } from "./data/facilities.js";
import { recommendRules, routes as legacyRoutes } from "./data/routes.js";
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
import {
  findNetworkPath,
  hydrateSvgMapData,
  legacyRouteIdMap,
  parseSvgMapMetadata,
  SVG_DATA_ASSET,
  SVG_MAP_ASSET,
  SVG_MAP_SIZE
} from "./data/svgMap.js";

const currentLocationId = "visitor_center";

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
  const [mapData, setMapData] = useState(() => ({
    mapAsset: SVG_MAP_ASSET,
    mapSize: SVG_MAP_SIZE,
    zones: [],
    roads: [],
    bridges: [],
    pois: richPois,
    facilities: richFacilities,
    routes: legacyRoutes
  }));
  const [lang, setLang] = useState("zh");
  const labels = copy[lang];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPoi, setSelectedPoi] = useState(() => richPois.find((poi) => poi.id === "opera_house"));
  const [activeRoute, setActiveRoute] = useState(() => legacyRoutes.find((route) => route.id === "classic-cultural"));
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
  const [recommendation, setRecommendation] = useState({
    duration: labels.durations[1],
    visitor: labels.visitors[0],
    interest: labels.interests[0]
  });
  const [generated, setGenerated] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(SVG_DATA_ASSET)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load SVG map: ${response.status}`);
        return response.text();
      })
      .then((svgText) => hydrateSvgMapData(parseSvgMapMetadata(svgText), richPois, richFacilities))
      .then((nextMapData) => {
        if (cancelled) return;
        setMapData(nextMapData);
        setSelectedPoi(normalizeItem(nextMapData.pois.find((poi) => poi.id === "opera_house") || nextMapData.pois[0]));
        setActiveRoute(nextMapData.routes.find((route) => route.id === "route_classic") || nextMapData.routes[0]);
        setViewRequest({ type: "fit-map", nonce: Date.now() });
      })
      .catch((error) => {
        console.error(error);
        showToast(lang === "zh" ? "SVG地图数据读取失败" : "Failed to load SVG map data");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const normalizedPois = useMemo(() => mapData.pois.map(normalizeItem), [mapData.pois]);
  const normalizedFacilities = useMemo(() => mapData.facilities.map(normalizeItem), [mapData.facilities]);
  const routes = mapData.routes;
  const allMapItems = useMemo(() => [...normalizedPois, ...normalizedFacilities], [normalizedPois, normalizedFacilities]);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allMapItems.filter((poi) => searchMatchesPoi(poi, searchTerm));
  }, [allMapItems, searchTerm]);

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
    const networkPath = findNetworkPath(from, poi, mapData);
    if (!networkPath.length) {
      showToast(lang === "zh" ? "未找到可通行路网路径" : "No walkable network path found");
      return;
    }
    setNavigationTarget({
      fromId: currentLocationId,
      toId: poi.id,
      distance: { zh: `${approxMeters}米`, en: `${approxMeters} m` },
      time: { zh: `${minutes}分钟`, en: `${minutes} min` },
      path: networkPath
    });
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
    const routeId = legacyRouteIdMap[rule.routeId] || rule.routeId;
    const route = routes.find((item) => item.id === routeId) || routes[1];
    setActiveRoute(route);
    requestView({ type: "route", route });
    setGenerated({ route, reason: rule.reason });
  };

  const handleRouteSelect = (route) => {
    setActiveRoute(route);
    setMobilePanel("routes");
    requestView({ type: "route", route });
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
      rightCollapsed ? "right-collapsed" : ""
    ].join(" ")}>
      <Header
        lang={lang}
        labels={labels}
        searchTerm={searchTerm}
        setSearchTerm={(value) => {
          setSearchTerm(value);
          if (value.trim()) setMobilePanel("pois");
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
            onToggleFullscreen={() => setIsMapFullscreen((value) => !value)}
            mapAsset={mapData.mapAsset}
            mapSize={mapData.mapSize}
            zones={mapData.zones}
            annotatedBase
          />
          <div className="bottom-dock">
            <Legend labels={labels} />
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

      <section className="mobile-bottom-sheet" aria-label="mobile guide controls">
        <div className="mobile-grabber" />
        <nav className="mobile-tabs">
          {mobileTabs.map((item) => (
            <button
              key={item.key}
              className={mobilePanel === item.key ? "active" : ""}
              onClick={() => setMobilePanel(item.key)}
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
