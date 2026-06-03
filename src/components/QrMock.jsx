export default function QrMock({ labels }) {
  return (
    <section className="qr-card">
      <div className="qr-fake" aria-label="fake QR code">
        {Array.from({ length: 64 }).map((_, index) => (
          <span key={index} className={(index * 7 + index / 2) % 5 < 2 ? "dark" : ""} />
        ))}
      </div>
      <div>
        <strong>{labels.scanTitle}</strong>
        <p>Scan for Multilingual Guide</p>
        <small>{labels.scanSubtitle}</small>
      </div>
    </section>
  );
}
