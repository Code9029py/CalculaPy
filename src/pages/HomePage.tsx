import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  calculatorRegistry,
  getCalculatorPath
} from "../calculators/registry";
import type { CalculatorMetadata } from "../calculators/types";
import { PageMeta } from "../components/PageMeta";
import { getRecentCalculators } from "../utils/recentCalculators";

const usageSteps = [
  "Elegí una calculadora.",
  "Cargá los datos.",
  "Revisá el resultado y el desglose."
];

/* Descripciones cortas pensadas para la card de la home.
   Las del metadata son más largas y están pensadas para el catálogo y SEO. */
const shortDescriptions: Record<string, string> = {
  iva: "Agregá o separá IVA con tasas 5% y 10%.",
  cuotas: "Compará contado contra cuotas.",
  presupuesto: "Estimá ingresos, gastos y saldo.",
  combustible: "Estimá litros y costo del viaje.",
  importacion: "Estimá el costo final de una compra internacional."
};

function getShortDescription(calculator: CalculatorMetadata) {
  return shortDescriptions[calculator.slug] ?? calculator.description;
}

function findCalculator(slug: string) {
  return calculatorRegistry.find((calculator) => calculator.slug === slug);
}

export function HomePage() {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  /* Leemos del localStorage en el cliente. En SSR esto se ejecuta tras el
     hydrate, lo cual está bien — el render inicial muestra el fallback. */
  useEffect(() => {
    setRecentSlugs(getRecentCalculators(3));
  }, []);

  const recentCalculators = recentSlugs
    .map((slug) => findCalculator(slug))
    .filter((value): value is CalculatorMetadata => Boolean(value));

  const hasRecent = recentCalculators.length > 0;

  const fallbackCalculators = calculatorRegistry.slice(0, 3);
  const calculatorsToShow = hasRecent ? recentCalculators : fallbackCalculators;

  const sectionHeading = hasRecent
    ? "Usadas recientemente"
    : "Empezá por aquí";
  const sectionAriaLabel = hasRecent
    ? "Últimas calculadoras que usaste"
    : "Calculadoras destacadas para empezar";

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
              fórmulas claras y fuentes a la vista.
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
            <h2 id="tools-heading">{sectionHeading}</h2>
          </div>
          <div className="quick-access-grid" aria-label={sectionAriaLabel}>
            {calculatorsToShow.map((calculator) => {
              const Icon = calculator.icon;
              return (
                <article
                  className="tool-card tool-card--available quick-tool-card"
                  key={calculator.slug}
                >
                  <span className="tool-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <div className="quick-tool-card__body">
                    <p className="calculator-card__category">
                      {calculator.category}
                    </p>
                    <h3>{calculator.title}</h3>
                    <p>{getShortDescription(calculator)}</p>
                  </div>
                  <Link
                    className="button button--primary button--compact"
                    to={getCalculatorPath(calculator)}
                  >
                    Abrir
                  </Link>
                </article>
              );
            })}
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
