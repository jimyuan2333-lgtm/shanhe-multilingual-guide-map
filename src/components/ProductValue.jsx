export default function ProductValue({ labels }) {
  return (
    <section className="value-card">
      <h3>{labels.productValue}</h3>
      <ol>
        {labels.valueItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  );
}
