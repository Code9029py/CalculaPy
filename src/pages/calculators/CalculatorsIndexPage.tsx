import { Link } from "react-router-dom";

import { calculatorRegistry, getCalculatorPath } from "../../calculators/registry";
import { PageMeta } from "../../components/PageMeta";

const calculatorCapabilities: Record<string, string> = {
  iva: "Agregar IVA a un monto neto o separar el IVA de un monto que ya lo incluye."
};

const calculatorTags: Record<string, string[]> = {
  iva: ["IVA 5%", "IVA 10%", "Agregar IVA", "Separar IVA"]
};

const upcomingTools = [
  {
    category: "Finanzas",
    description: "Comparar pago contado contra cuotas y ver el sobrecosto total.",
    title: "Cuotas"
  },
  {
    category: "Organizacion",
    description: "Armar una estimacion mensual con ingresos, gastos y margen.",
    title: "Presupuesto"
  },
  {
    category: "Vida diaria",
    description: "Estimar gasto mensual segun distancia, consumo y precio por litro.",
    title: "Combustible"
  },
  {
    category: "Compras",
    description: "Estimar costos de compra internacional con datos configurables.",
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
        <div className="section-heading">
          <p className="eyebrow">Herramientas</p>
          <h1>Calculadoras</h1>
          <p>
            Elegi una herramienta y carga tus datos. Cada calculadora incluye
            explicacion del calculo y aviso orientativo.
          </p>
        </div>

        <div className="calculator-grid">
          {calculatorRegistry.map((calculator) => (
            <article className="tool-card" key={calculator.slug}>
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
              <p className="small-note">Incluye formula y aviso orientativo.</p>
              <span className="status-pill status-pill--ready">Disponible</span>
              <Link
                className="button button--primary"
                to={getCalculatorPath(calculator)}
              >
                Abrir calculadora
              </Link>
            </article>
          ))}
          {upcomingTools.map((tool) => (
            <article className="tool-card tool-card--soon" key={tool.title}>
              <div>
                <p className="calculator-card__category">{tool.category}</p>
                <h2>{tool.title}</h2>
                <p>{tool.description}</p>
              </div>
              <div className="tag-list" aria-label="Estado">
                <span className="status-pill">Proximamente</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
