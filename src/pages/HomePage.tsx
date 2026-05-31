import { Link } from "react-router-dom";

import { ivaMetadata } from "../calculators/iva/metadata";
import { PageMeta } from "../components/PageMeta";

const trustItems = [
  {
    title: "Formulas visibles",
    text: "Cada herramienta muestra la formula usada para que el numero no salga de una caja negra."
  },
  {
    title: "Fuentes cuando corresponde",
    text: "Cuando un dato depende de una referencia externa, la fuente queda disponible en la calculadora."
  },
  {
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
        <div className="home-hero">
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
        </div>

        <section className="home-section" aria-labelledby="tools-heading">
          <div className="section-heading">
            <p className="eyebrow">Disponible ahora</p>
            <h2 id="tools-heading">Herramientas disponibles</h2>
          </div>
          <article className="tool-card tool-card--available">
            <div>
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
          <div className="content-grid content-grid--three">
            {trustItems.map((item) => (
              <article className="content-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
