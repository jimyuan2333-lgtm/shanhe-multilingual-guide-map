import { Route, SlidersHorizontal } from "./icons.jsx";

export default function RoutePanel({
  lang,
  labels,
  routes,
  activeRoute,
  setActiveRoute,
  recommendation,
  setRecommendation,
  generated,
  onGenerate
}) {
  const active = activeRoute;

  return (
    <section className="panel route-panel">
      <div className="panel-heading">
        <h2>{labels.routes}</h2>
        <Route size={18} />
      </div>

      <div className="route-list">
        {routes.map((route) => (
          <button
            key={route.id}
            className={active?.id === route.id ? "route-card active" : "route-card"}
            onClick={() => setActiveRoute(route)}
            style={{ "--route-color": route.color }}
          >
            <span className="route-key">{route.key}</span>
            <span>
              <strong>{route.name[lang]}</strong>
              <small>{route.duration[lang]} · {route.feature[lang]}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="smart-box">
        <div className="mini-heading">
          <span>{labels.smartRecommend}</span>
          <SlidersHorizontal size={16} />
        </div>

        <label>
          {labels.duration}
          <select
            value={recommendation.duration}
            onChange={(event) => setRecommendation({ ...recommendation, duration: event.target.value })}
          >
            {labels.durations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          {labels.visitorType}
          <select
            value={recommendation.visitor}
            onChange={(event) => setRecommendation({ ...recommendation, visitor: event.target.value })}
          >
            {labels.visitors.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          {labels.interest}
          <select
            value={recommendation.interest}
            onChange={(event) => setRecommendation({ ...recommendation, interest: event.target.value })}
          >
            {labels.interests.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <button className="primary-button full" onClick={onGenerate}>{labels.generate}</button>

        {generated && (
          <div className="recommend-result">
            <strong>{labels.generatedReason}</strong>
            <p>{generated.reason[lang]}</p>
          </div>
        )}
      </div>
    </section>
  );
}
