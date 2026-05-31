type CalculatorLayoutProps = {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
};

export function CalculatorLayout({
  title,
  description,
  category,
  children
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
        </div>
        <div className="calculator-layout">{children}</div>
      </div>
    </section>
  );
}
