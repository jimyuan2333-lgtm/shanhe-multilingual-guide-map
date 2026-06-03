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

export default function DetailPanel({ lang, labels, selectedPoi, audioState, onPlayAudio }) {
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
  const audioText = lang === "zh"
    ? `山河戏楼英文导览音频`
    : `English audio guide for ${selectedPoi.name.en}`;

  return (
    <section className="detail-panel">
      <div className="detail-hero">
        <span className={`detail-type ${isFacility ? selectedPoi.type : selectedPoi.type.split("/")[0]}`}>
          {isFacility ? facilityTypeLabels[selectedPoi.type]?.[lang] || selectedPoi.type : selectedPoi.type}
        </span>
        <h2>{selectedPoi.name[lang]}</h2>
        <p>{selectedPoi.name[secondaryLang]}</p>
      </div>

      {isFacility ? (
        <div className="facts">
          <span><Info size={16} />{facilityTypeLabels[selectedPoi.type]?.[lang] || selectedPoi.type}</span>
          <span><Navigation size={16} />{labels.distance}: {selectedPoi.distance[lang]}</span>
          <span><Clock size={16} />{labels.status}: {selectedPoi.status[lang]}</span>
        </div>
      ) : (
        <div className="facts">
          <span><Clock size={16} />{labels.stay}: {selectedPoi.stay[lang]}</span>
          <span><Info size={16} />{labels.open}: {selectedPoi.open}</span>
          <span><Headphones size={16} />{labels.audio}: {selectedPoi.audio ? "Yes" : "No"}</span>
          <span><Accessibility size={16} />{labels.access}: {selectedPoi.accessible ? "Yes" : "No"}</span>
        </div>
      )}

      <div className="intro-block">
        <p>{selectedPoi.intro[lang]}</p>
        <p>{selectedPoi.intro[secondaryLang]}</p>
      </div>

      {!isFacility && (
        <>
          <div className="meta-row">
            <strong>{labels.audience}</strong>
            <span>{selectedPoi.audience[lang]}</span>
          </div>
          <div className="meta-row">
            <strong>{labels.keywords}</strong>
            <div className="tag-row">
              {selectedPoi.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
            </div>
          </div>
        </>
      )}

      {audioState?.id === selectedPoi.id && (
        <div className="audio-box">
          <div>
            <Volume2 size={16} />
            <span>{labels.nowPlaying}: {audioText}</span>
          </div>
          <div className="audio-progress"><i /></div>
          <button><Pause size={14} />{labels.pause}</button>
        </div>
      )}

      <div className="action-grid">
        <button className="primary-button"><Navigation size={16} />{isFacility ? labels.navigateHere : labels.startNav}</button>
        {!isFacility && <button onClick={() => onPlayAudio(selectedPoi)}><Play size={16} />{labels.playAudio}</button>}
        {!isFacility && <button><Info size={16} />{labels.addRoute}</button>}
        {!isFacility && <button><Headphones size={16} />{labels.bilingual}</button>}
        {!isFacility && <button><Share2 size={16} />{labels.share}</button>}
      </div>
    </section>
  );
}
