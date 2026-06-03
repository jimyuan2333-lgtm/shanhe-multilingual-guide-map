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

const allMapItems = [...pois, ...facilities];

function categoryMatches(poi, selectedCategory) {
  if (selectedCategory === "all") return true;
  if (selectedCategory === "attractions") return poi.category?.includes("attractions");
  if (selectedCategory === "facilities") return Boolean(poi.distance) || poi.category?.includes("facilities");
  return poi.category?.includes(selectedCategory) || poi.type?.includes(selectedCategory);
}

function searchMatchesPoi(poi, term) {
  if (!term.trim()) return false;
  const normalized = term.trim().toLowerCase();
  const haystack = [
    poi.name.zh,
    poi.name.en,
    poi.type,
    ...(poi.category || []),
    poi.intro?.zh,
    poi.intro?.en,
    ...(poi.keywords || [])
  ].filter(Boolean).join(" ").toLowerCase();
  return haystack.includes(normalized);
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const labels = copy[lang];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPoi, setSelectedPoi] = useState(() => pois.find((poi) => poi.id === "opera_house"));
  const [activeRoute, setActiveRoute] = useState(() => routes.find((route) => route.id === "classic-cultural"));
  const [audioState, setAudioState] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
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

  const handleSelectPoi = (poi) => {
    setSelectedPoi(poi);
  };

  const handlePlayAudio = (poi) => {
    setAudioState({ id: poi.id, progress: 42 });
  };

  const handleGenerate = () => {
    const choices = [recommendation.duration, recommendation.visitor, recommendation.interest];
    const rule = recommendRules.find((item) => item.matches.some((match) => choices.includes(match))) || recommendRules[4];
    const route = routes.find((item) => item.id === rule.routeId) || routes[1];
    setActiveRoute(route);
    setGenerated({ route, reason: rule.reason });
  };

  const visibleCategoryFilter = (poi) => categoryMatches(poi, selectedCategory);

  return (
    <div className="app">
      <Header
        lang={lang}
        labels={labels}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
        <aside className="left-column">
          <PoiPanel
            lang={lang}
            labels={labels}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchResults={searchResults}
            searchTerm={searchTerm}
            onSelectPoi={handleSelectPoi}
          />
          <RoutePanel
            lang={lang}
            labels={labels}
            routes={routes}
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
            recommendation={recommendation}
            setRecommendation={setRecommendation}
            generated={generated}
            onGenerate={handleGenerate}
          />
          <FacilityPanel lang={lang} labels={labels} facilities={facilities} onSelectPoi={handleSelectPoi} />
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
            zoom={zoom}
            setZoom={setZoom}
            pan={pan}
            setPan={setPan}
          />
          <div className="bottom-dock">
            <Legend labels={labels} />
            <div className="active-route-strip" style={{ "--route-color": activeRoute.color }}>
              <strong>{labels.routeNodes}: {activeRoute.name[lang]}</strong>
              <p>
                {activeRoute.nodes
                  .map((id) => allMapItems.find((poi) => poi.id === id)?.name[lang])
                  .filter(Boolean)
                  .join(" → ")}
              </p>
              <small>{labels.routeFeature}: {activeRoute.feature[lang]}</small>
            </div>
          </div>
        </section>

        <aside className="right-column">
          <DetailPanel
            lang={lang}
            labels={labels}
            selectedPoi={selectedPoi}
            audioState={audioState}
            onPlayAudio={handlePlayAudio}
          />
          <ProductValue labels={labels} />
          <QrMock labels={labels} />
        </aside>
      </main>
    </div>
  );
}
