type SourceItem = {
  name: string;
  description: string;
  url?: string;
};

type SourceBoxProps = {
  sources: SourceItem[];
  lastReviewedAt: string;
};

export function SourceBox({ sources, lastReviewedAt }: SourceBoxProps) {
  return (
    <section className="info-box">
      <h2>Fuentes y revision</h2>
      <ul className="source-list">
        {sources.map((source) => (
          <li key={source.name}>
            {source.url ? (
              <a href={source.url} rel="noreferrer" target="_blank">
                {source.name}
              </a>
            ) : (
              <strong>{source.name}</strong>
            )}
            <span>{source.description}</span>
          </li>
        ))}
      </ul>
      <p className="muted">Ultima revision: {lastReviewedAt}</p>
    </section>
  );
}
