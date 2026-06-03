import {
  Accessibility,
  Clock,
  Headphones,
  Info,
  Navigation,
  Pause,
  Play,
  Share2,
  Volume2
} from "./icons.jsx";
import { facilityTypeLabels } from "../data/facilities.js";
import { getReadableType } from "../data/mapMeta.js";
import { text, textArray } from "../utils/lang.js";

export default function DetailPanel({
  lang,
  labels,
  selectedPoi,
  audioState,
  onPlayAudio,
  onStartNavigation,
  onAddToRoute,
  onBilingualIntro,
  onShareCard,
  navigationTarget,
  myRoute
}) {
  if (!selectedPoi) {
    return (
      <section className="detail-panel empty">
        <h2>{labels.details}</h2>
        <p>{labels.noSelection}</p>
      </section>
    );
  }

  const isFacility = Boolean(selectedPoi.distance);
  const secondaryLang = lang === "zh" ? "en" : "zh";
  const keywords = textArray(selectedPoi.keywords, lang);
  const isCurrentAudio = audioState?.id === selectedPoi.id;
  const isPlaying = isCurrentAudio && audioState.playing;
  const isNavigationTarget = navigationTarget?.toId === selectedPoi.id;
  const audioText = lang === "zh"
    ? `正在播放：${selectedPoi.name.zh}中文导览音频`
    : `${labels.nowPlaying}: ${text(selectedPoi.name, lang)} ${labels.audio}`;

  return (
    <section className="detail-panel">
      <div className="detail-hero">
        <span className={`detail-type ${isFacility ? selectedPoi.type : selectedPoi.type.split("/")[0]}`}>
          {getReadableType(selectedPoi, lang, facilityTypeLabels)}
        </span>
        <h2>{text(selectedPoi.name, lang)}</h2>
        <p>{text(selectedPoi.name, secondaryLang)}</p>
      </div>

      {isFacility ? (
        <div className="facts">
          <span><Info size={16} />{labels.facilityType}: {text(facilityTypeLabels[selectedPoi.type], lang, selectedPoi.type)}</span>
          <span><Navigation size={16} />{labels.distance}: {text(selectedPoi.distance, lang)}</span>
          <span><Clock size={16} />{labels.status}: {text(selectedPoi.status, lang)}</span>
        </div>
      ) : (
        <div className="facts">
          <span><Clock size={16} />{labels.stay}: {text(selectedPoi.stay, lang)}</span>
          <span><Info size={16} />{labels.open}: {text(selectedPoi.open, lang, selectedPoi.open)}</span>
          <span><Headphones size={16} />{labels.audio}: {selectedPoi.audio ? labels.yes : labels.no}</span>
          <span><Accessibility size={16} />{labels.access}: {selectedPoi.accessible ? labels.yes : labels.no}</span>
        </div>
      )}

      {isNavigationTarget && (
        <div className="navigation-feedback">
          <strong>{labels.navigationRoute}</strong>
          <span>{labels.walkingEstimate}: {text(navigationTarget.time, lang)} · {text(navigationTarget.distance, lang)}</span>
        </div>
      )}

      <div className="intro-block">
        <p>{text(selectedPoi.intro, lang)}</p>
        <p>{text(selectedPoi.intro, secondaryLang)}</p>
      </div>

      {!isFacility && (
        <>
          <div className="meta-row">
            <strong>{labels.audience}</strong>
            <span>{text(selectedPoi.audience, lang)}</span>
          </div>
          <div className="meta-row">
            <strong>{labels.keywords}</strong>
            <div className="tag-row">
              {keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
            </div>
          </div>
        </>
      )}

      {isCurrentAudio && (
        <div className={`audio-box ${isPlaying ? "playing" : "paused"}`}>
          <div>
            <Volume2 size={16} />
            <span>{audioText}</span>
          </div>
          <div className="audio-progress"><i style={{ width: `${audioState.progress || 42}%` }} /></div>
          <button onClick={() => onPlayAudio(selectedPoi)}>
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? labels.pause : labels.resume}
          </button>
        </div>
      )}

      <div className="action-grid">
        <button className="primary-button" onClick={() => onStartNavigation(selectedPoi)}>
          <Navigation size={16} />
          {isFacility ? labels.navigateHere : labels.startNav}
        </button>
        {!isFacility && (
          <button onClick={() => onPlayAudio(selectedPoi)}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? labels.pause : labels.playAudio}
          </button>
        )}
        {!isFacility && <button onClick={() => onAddToRoute(selectedPoi)}><Info size={16} />{labels.addRoute}</button>}
        {!isFacility && <button onClick={() => onBilingualIntro(selectedPoi)}><Headphones size={16} />{labels.bilingual}</button>}
        {!isFacility && <button onClick={() => onShareCard(selectedPoi)}><Share2 size={16} />{labels.share}</button>}
      </div>

      {!isFacility && myRoute.length > 0 && (
        <div className="my-route-chip">
          <strong>{labels.myRoute}</strong>
          <span>{myRoute.map((item) => text(item.name, lang)).join(" · ")}</span>
        </div>
      )}
    </section>
  );
}
