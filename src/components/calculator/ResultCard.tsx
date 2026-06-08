type ResultRow = {
  label: string;
  value: string;
};

type ResultCardProps = {
  actions?: React.ReactNode;
  context?: string;
  title: string;
  result: string;
  helper: string;
  rows: ResultRow[];
  secondaryRows?: ResultRow[];
  secondaryTitle?: string;
};

export function ResultCard({
  actions,
  context,
  title,
  result,
  helper,
  rows,
  secondaryRows,
  secondaryTitle
}: ResultCardProps) {
  return (
    <section className="result-card" aria-live="polite">
      <p className="result-card__label">{title}</p>
      <strong className="result-card__value">{result}</strong>
      <p className="result-card__helper">{helper}</p>
      {context ? <p className="result-card__context">{context}</p> : null}
      <dl className="result-breakdown">
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      {secondaryRows?.length ? (
        <div className="result-card__secondary">
          {secondaryTitle ? (
            <p className="result-card__secondary-title">{secondaryTitle}</p>
          ) : null}
          <dl className="result-breakdown result-breakdown--secondary">
            {secondaryRows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
      {actions ? <div className="result-card__actions">{actions}</div> : null}
    </section>
  );
}
