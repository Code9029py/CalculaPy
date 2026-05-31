import { Link } from "react-router-dom";

import { ivaMetadata } from "../calculators/iva/metadata";
import { PageMeta } from "../components/PageMeta";

const trustItems = [
  {
    icon: "fx",
    title: "Formulas visibles",
    text: "Cada herramienta muestra la formula usada para que el numero no salga de una caja negra."
  },
  {
    icon: "src",
    title: "Fuentes cuando corresponde",
    text: "Cuando un dato depende de una referencia externa, la fuente queda disponible en la calculadora."
  },
  {
    icon: "i",
    title: "Resultados orientativos",
    text: "Los calculos ayudan a estimar, pero no reemplazan fuentes oficiales ni asesoramiento profesional."
  }
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

        <section className="home-section" aria-labelledby="tools-heading">
          <div className="section-heading">
            <p className="eyebrow">Disponible ahora</p>
            <h2 id="tools-heading">Herramientas disponibles</h2>
          </div>
          <article className="tool-card tool-card--available home-tool-card">
            <div>
              <span className="tool-icon" aria-hidden="true">IVA</span>
              <p className="calculator-card__category">{ivaMetadata.category}</p>
              <h3>{ivaMetadata.title}</h3>
              <p>
                Agrega IVA a un monto neto o separa el IVA de un precio final
                con tasas 5% y 10%.
              </p>
            </div>
            <Link className="button button--primary" to="/calculadoras/iva">
              Abrir calculadora
            </Link>
          </article>
        </section>

        <section className="home-section">
          <div className="section-heading">
            <p className="eyebrow">Antes de usar los resultados</p>
            <h2>Calcula, revisa y decide con contexto</h2>
          </div>
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
