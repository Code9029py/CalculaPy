import { Link } from "react-router-dom";

import { calculatorRegistry, getCalculatorPath } from "../../calculators/registry";
import { PageMeta } from "../../components/PageMeta";

export function CalculatorsIndexPage() {
  return (
    <section className="page">
      <PageMeta
        title="Calculadoras para Paraguay | CalculaPy"
        description="Indice de calculadoras orientativas para Paraguay con formulas, fuentes y fecha de revision."
      />
      <div className="page__content">
        <div className="section-heading">
          <p className="eyebrow">Indice</p>
          <h1>Calculadoras</h1>
          <p>
            Cada calculadora publicada muestra formula, fuentes, fecha de
            revision y aviso de alcance.
          </p>
        </div>

        <div className="calculator-grid">
          {calculatorRegistry.map((calculator) => (
            <article className="calculator-card" key={calculator.slug}>
              <div>
                <p className="calculator-card__category">
                  {calculator.category}
                </p>
                <h2>{calculator.title}</h2>
                <p>{calculator.description}</p>
              </div>
              <dl className="metadata-list">
                <div>
                  <dt>Riesgo</dt>
                  <dd>{calculator.riskLevel}</dd>
                </div>
                <div>
                  <dt>Estado</dt>
                  <dd>{calculator.status}</dd>
                </div>
                <div>
                  <dt>Revision</dt>
                  <dd>{calculator.lastReviewedAt}</dd>
                </div>
              </dl>
              <Link
                className="button button--primary"
                to={getCalculatorPath(calculator)}
              >
                Abrir calculadora
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
