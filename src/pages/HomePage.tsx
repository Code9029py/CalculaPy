import { Link } from "react-router-dom";

import { ivaMetadata } from "../calculators/iva/metadata";
import { PageMeta } from "../components/PageMeta";

const trustItems = [
  {
    icon: "fx",
    title: "Formulas claras"
  },
  {
    icon: "src",
    title: "Fuentes cuando corresponde"
  },
  {
    icon: "i",
    title: "Resultados orientativos"
  }
];

const usageSteps = [
  "Elegi una calculadora.",
  "Carga tus datos.",
  "Revisa el resultado y el desglose."
];

export function HomePage() {
  return (
    <section className="page page--home">
      <PageMeta
        title="CalculaPy | Calculadoras simples para Paraguay"
        description="Herramientas simples y orientativas para calcular numeros utiles en Paraguay."
      />
      <div className="page__content home-stack">
        <div className="home-hero app-hero">
          <div className="home-hero__copy">
            <p className="eyebrow">Herramientas utiles</p>
            <h1>Calculadoras simples para Paraguay</h1>
            <p className="hero__lead">
              Estima IVA, cuotas, presupuesto y otros calculos cotidianos con
              resultados orientativos y formulas claras.
            </p>
            <div className="hero__actions">
              <Link className="button button--primary" to="/calculadoras">
                Ver calculadoras
              </Link>
            </div>
          </div>
          <div className="hero-preview" aria-hidden="true">
            <div className="hero-preview__bar">
              <span></span>
              <span></span>
            </div>
            <div className="hero-preview__result">
              <small>Resultado orientativo</small>
              <strong>Gs. 110.000</strong>
            </div>
            <div className="hero-preview__rows">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <section
          className="home-section home-section--compact"
          data-section-role="quick-access"
          aria-labelledby="tools-heading"
        >
          <div className="section-heading section-heading--compact">
            <h2 id="tools-heading">Acceso rapido</h2>
          </div>
          <div className="quick-access-grid" aria-label="Herramientas disponibles">
            <article className="tool-card tool-card--available quick-tool-card">
              <span className="tool-icon" aria-hidden="true">IVA</span>
              <div className="quick-tool-card__body">
                <p className="calculator-card__category">
                  {ivaMetadata.category}
                </p>
                <h3>{ivaMetadata.title}</h3>
                <p>
                  Agrega o separa IVA con tasas 5% y 10%.
                </p>
              </div>
              <Link
                className="button button--primary button--compact"
                to="/calculadoras/iva"
              >
                Abrir
              </Link>
            </article>
          </div>
        </section>

        <section className="home-section home-section--steps" aria-labelledby="how-heading">
          <div className="section-heading section-heading--compact">
            <h2 id="how-heading">Como usar CalculaPy</h2>
          </div>
          <div className="steps-strip">
            {usageSteps.map((step, index) => (
              <article className="step-card" key={step}>
                <span aria-hidden="true">{index + 1}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section home-section--trust">
          <div className="trust-strip">
            {trustItems.map((item) => (
              <div className="trust-strip__item" key={item.title}>
                <span aria-hidden="true">{item.icon}</span>
                <strong>{item.title}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
