import { Link } from "react-router-dom";

import { calculatorRegistry, getCalculatorPath } from "../../calculators/registry";
import { PageMeta } from "../../components/PageMeta";

const upcomingTools = [
  {
    category: "Finanzas",
    description: "Comparar pago contado contra cuotas y ver el sobrecosto total.",
    icon: "Gs",
    title: "Cuotas"
  },
  {
    category: "Organizacion",
    description: "Armar una estimacion mensual con ingresos, gastos y margen.",
    icon: "%",
    title: "Presupuesto"
  },
  {
    category: "Vida diaria",
    description: "Estimar gasto mensual segun distancia, consumo y precio por litro.",
    icon: "km",
    title: "Combustible"
  },
  {
    category: "Compras",
    description: "Estimar costos de compra internacional con datos configurables.",
    icon: "imp",
    title: "Importacion"
  }
];

export function CalculatorsIndexPage() {
  return (
    <section className="page">
      <PageMeta
        title="Calculadoras para Paraguay | CalculaPy"
        description="Catalogo de herramientas de calculo simples y orientativas para Paraguay."
      />
      <div className="page__content">
        <div className="catalog-heading app-page-heading">
          <div>
            <p className="eyebrow">Herramientas</p>
            <h1>Calculadoras</h1>
            <p>
              Elegi una herramienta y carga tus datos. El catalogo ira creciendo
              sin perder foco en calculos simples.
            </p>
          </div>
          <p className="catalog-summary">
            {calculatorRegistry.length} disponible / {upcomingTools.length} proximas
          </p>
        </div>

        <div className="calculator-list">
          {calculatorRegistry.map((calculator) => (
            <article className="tool-card tool-row-card" key={calculator.slug}>
              <span className="tool-icon" aria-hidden="true">IVA</span>
              <div className="tool-row-card__body">
                <p className="calculator-card__category">{calculator.category}</p>
                <div className="tool-row-card__title">
                  <h2>{calculator.title}</h2>
                  <span className="status-pill status-pill--ready">Disponible</span>
                </div>
                <p>{calculator.description}</p>
              </div>
              <Link
                className="button button--primary button--compact"
                to={getCalculatorPath(calculator)}
              >
                Abrir
              </Link>
            </article>
          ))}
          {upcomingTools.map((tool) => (
            <article className="tool-card tool-row-card tool-card--soon" key={tool.title}>
              <span className="tool-icon tool-icon--muted" aria-hidden="true">
                {tool.icon}
              </span>
              <div className="tool-row-card__body">
                <p className="calculator-card__category">{tool.category}</p>
                <div className="tool-row-card__title">
                  <h2>{tool.title}</h2>
                  <span className="status-pill">Proximamente</span>
                </div>
                <p>{tool.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
