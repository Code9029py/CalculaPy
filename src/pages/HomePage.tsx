import { Link } from "react-router-dom";

import { cuotasMetadata } from "../calculators/cuotas/metadata";
import { ivaMetadata } from "../calculators/iva/metadata";
import { presupuestoMetadata } from "../calculators/presupuesto/metadata";
import { PageMeta } from "../components/PageMeta";

const usageSteps = [
  "Elegí una calculadora.",
  "Cargá los datos.",
  "Revisá el resultado y el desglose."
];

export function HomePage() {
  const CuotasIcon = cuotasMetadata.icon;
  const PresupuestoIcon = presupuestoMetadata.icon;

  return (
    <section className="page page--home">
      <PageMeta
        title="CalculaPy | Calculadoras simples para Paraguay"
        description="Herramientas simples y orientativas para calcular números útiles en Paraguay."
      />
      <div className="page__content home-stack">
        <div className="home-hero app-hero">
          <div className="home-hero__copy">
            <p className="eyebrow">Herramientas útiles</p>
            <h1>Calculadoras simples para Paraguay</h1>
            <p className="hero__lead">
              Estimá IVA, cuotas, presupuesto y otros cálculos cotidianos con
              resultados orientativos y fórmulas claras.
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
          aria-labelledby="tools-heading"
        >
          <div className="section-heading section-heading--compact">
            <h2 id="tools-heading">Acceso rápido</h2>
          </div>
          <div className="quick-access-grid" aria-label="Herramientas disponibles">
            <article className="tool-card tool-card--available quick-tool-card">
              <span className="tool-icon" aria-hidden="true">IVA</span>
              <div className="quick-tool-card__body">
                <p className="calculator-card__category">
                  {ivaMetadata.category}
                </p>
                <h3>{ivaMetadata.title}</h3>
                <p>Agregá o separá IVA con tasas 5% y 10%.</p>
              </div>
              <Link
                className="button button--primary button--compact"
                to="/calculadoras/iva"
              >
                Abrir
              </Link>
            </article>
            <article className="tool-card tool-card--available quick-tool-card">
              <span className="tool-icon" aria-hidden="true">
                <CuotasIcon size={18} />
              </span>
              <div className="quick-tool-card__body">
                <p className="calculator-card__category">
                  {cuotasMetadata.category}
                </p>
                <h3>{cuotasMetadata.title}</h3>
                <p>Compará contado contra cuotas.</p>
              </div>
              <Link
                className="button button--primary button--compact"
                to="/calculadoras/cuotas"
              >
                Abrir
              </Link>
            </article>
            <article className="tool-card tool-card--available quick-tool-card">
              <span className="tool-icon" aria-hidden="true">
                <PresupuestoIcon size={18} />
              </span>
              <div className="quick-tool-card__body">
                <p className="calculator-card__category">
                  {presupuestoMetadata.category}
                </p>
                <h3>{presupuestoMetadata.title}</h3>
                <p>Estimá ingresos, gastos y saldo.</p>
              </div>
              <Link
                className="button button--primary button--compact"
                to="/calculadoras/presupuesto"
              >
                Abrir
              </Link>
            </article>
          </div>
        </section>

        <section
          className="home-section home-section--steps"
          aria-labelledby="how-heading"
        >
          <div className="section-heading section-heading--compact">
            <h2 id="how-heading">Cómo usar CalculaPy</h2>
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
      </div>
    </section>
  );
}
