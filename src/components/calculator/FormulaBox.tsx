type FormulaBoxProps = {
  title?: string;
  children: React.ReactNode;
};

export function FormulaBox({ title = "Formula usada", children }: FormulaBoxProps) {
  return (
    <section className="info-box">
      <h2>{title}</h2>
      <div className="info-box__content">{children}</div>
    </section>
  );
}
