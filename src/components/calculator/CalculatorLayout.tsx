type CalculatorLayoutProps = {
  title: string;
  description: string;
  category: string;
  lastReviewedAt: string;
  children: React.ReactNode;
  aside: React.ReactNode;
};

export function CalculatorLayout({
  title,
  description,
  category,
  lastReviewedAt,
  children,
  aside
}: CalculatorLayoutProps) {
  return (
    <section className="page calculator-page">
      <div className="page__content">
        <div className="calculator-hero">
          <div>
            <p className="eyebrow">{category}</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <p className="review-pill">Revision: {lastReviewedAt}</p>
        </div>
        <div className="calculator-layout">
          <div className="calculator-layout__main">{children}</div>
          <aside className="calculator-layout__aside">{aside}</aside>
        </div>
      </div>
    </section>
  );
}
