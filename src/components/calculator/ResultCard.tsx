type ResultRow = {
  label: string;
  value: string;
};

type ResultCardProps = {
  title: string;
  result: string;
  helper: string;
  rows: ResultRow[];
};

export function ResultCard({ title, result, helper, rows }: ResultCardProps) {
  return (
    <section className="result-card" aria-live="polite">
      <p className="result-card__label">{title}</p>
      <strong className="result-card__value">{result}</strong>
      <p className="result-card__helper">{helper}</p>
      <dl className="result-breakdown">
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
