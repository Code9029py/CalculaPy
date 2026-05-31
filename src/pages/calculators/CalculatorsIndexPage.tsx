import { Link } from "react-router-dom";

import { calculatorRegistry, getCalculatorPath } from "../../calculators/registry";
import { PageMeta } from "../../components/PageMeta";

const calculatorCapabilities: Record<string, string> = {
  iva: "Agregar IVA a un monto neto o separar el IVA de un monto que ya lo incluye."
};

const calculatorTags: Record<string, string[]> = {
  iva: ["IVA 5% y 10%", "Agregar o separar IVA"]
};

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
        <div className="section-heading app-page-heading">
          <p className="eyebrow">Herramientas</p>
          <h1>Calculadoras</h1>
          <p>
            Elegi una herramienta y carga tus datos. Cada calculadora incluye
            explicacion del calculo y aviso orientativo.
          </p>
        </div>

        <div className="calculator-grid">
          {calculatorRegistry.map((calculator) => (
            <article className="tool-card app-tool-card" key={calculator.slug}>
              <div className="tool-card__top">
                <span className="tool-icon" aria-hidden="true">IVA</span>
                <span className="status-pill status-pill--ready">Disponible</span>
              </div>
              <div>
                <p className="calculator-card__category">
                  {calculator.category}
                </p>
                <h2>{calculator.title}</h2>
                <p>{calculator.description}</p>
              </div>
              <p className="tool-note">
                {calculatorCapabilities[calculator.slug]}
              </p>
              <div className="tag-list" aria-label="Funciones disponibles">
                {calculatorTags[calculator.slug].map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                className="button button--primary"
                to={getCalculatorPath(calculator)}
              >
                Abrir calculadora
              </Link>
            </article>
          ))}
          {upcomingTools.map((tool) => (
            <article className="tool-card app-tool-card tool-card--soon" key={tool.title}>
              <div className="tool-card__top">
                <span className="tool-icon tool-icon--muted" aria-hidden="true">
                  {tool.icon}
                </span>
                <span className="status-pill">Proximamente</span>
              </div>
              <div>
                <p className="calculator-card__category">{tool.category}</p>
                <h2>{tool.title}</h2>
                <p>{tool.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
