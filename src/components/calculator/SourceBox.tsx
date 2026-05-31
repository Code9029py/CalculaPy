import { NoticeBox } from "../ui/NoticeBox";

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
    <NoticeBox
      tone="source"
      title="Fuentes y revisión"
      footer={
        <p className="notice__meta">Última revisión: {lastReviewedAt}</p>
      }
    >
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
    </NoticeBox>
  );
}
