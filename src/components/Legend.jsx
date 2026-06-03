export default function Legend({ labels }) {
  const items = [
    { label: labels.mainRoad, className: "line yellow" },
    { label: labels.secondaryRoad, className: "line green" },
    { label: labels.walkingTrail, className: "line dashed" },
    { label: labels.riversideRoute, className: "line blue" },
    { label: labels.nightRoute, className: "line purple" },
    { label: labels.attractionIcon, className: "dot brown" },
    { label: labels.facilityIcon, className: "dot blue" },
    { label: labels.currentLocation, className: "pin red" }
  ];

  return (
    <section className="legend-card">
      <strong>{labels.legend}</strong>
      <div className="legend-grid">
        {items.map((item) => (
          <span key={item.label} className="legend-item">
            <i className={item.className} />
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}
