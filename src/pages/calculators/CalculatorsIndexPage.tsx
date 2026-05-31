import { Fuel, Percent, ShoppingBag, Wallet } from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { Link } from "react-router-dom";

import {
  calculatorRegistry,
  getCalculatorPath
} from "../../calculators/registry";
import { PageMeta } from "../../components/PageMeta";

type UpcomingTool = {
  category: string;
  description: string;
  Icon: ComponentType<LucideProps>;
  title: string;
};

const upcomingTools: UpcomingTool[] = [
  {
    category: "Finanzas",
    description: "Comparar pago contado contra cuotas y ver el sobrecosto total.",
    Icon: Wallet,
    title: "Cuotas"
  },
  {
    category: "Organización",
    description: "Armar una estimación mensual con ingresos, gastos y margen.",
    Icon: Percent,
    title: "Presupuesto"
  },
  {
    category: "Vida diaria",
    description: "Estimar gasto mensual según distancia, consumo y precio por litro.",
    Icon: Fuel,
    title: "Combustible"
  },
  {
    category: "Compras",
    description: "Estimar costos de compra internacional con datos configurables.",
    Icon: ShoppingBag,
    title: "Importación"
  }
];

export function CalculatorsIndexPage() {
  return (
    <section className="page">
      <PageMeta
        title="Calculadoras para Paraguay | CalcuPY"
        description="Catálogo de herramientas de cálculo simples y orientativas para Paraguay."
      />
      <div className="page__content">
        <div className="catalog-hero">
          <div className="catalog-hero__content">
            <p className="eyebrow">Herramientas</p>
            <h1 className="catalog-hero__title">Calculadoras</h1>
            <p className="catalog-hero__description">
              Elegí una herramienta y cargá tus datos. El catálogo irá
              creciendo sin perder foco en cálculos simples.
            </p>
          </div>
          <p className="catalog-summary catalog-hero__summary">
            {calculatorRegistry.length} disponible · {upcomingTools.length} próximas
          </p>
        </div>

        <div className="calculator-list">
          {calculatorRegistry.map((calculator) => {
            const Icon = calculator.icon;
            return (
              <article
                className="tool-card tool-row-card"
                key={calculator.slug}
              >
                <span className="tool-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <div className="tool-row-card__body">
                  <p className="calculator-card__category">
                    {calculator.category}
                  </p>
                  <div className="tool-row-card__title">
                    <h2>{calculator.title}</h2>
                    <span className="status-pill status-pill--ready">
                      Disponible
                    </span>
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
            );
          })}
          {upcomingTools.map((tool) => {
            const Icon = tool.Icon;
            return (
              <article
                className="tool-card tool-row-card tool-card--soon"
                key={tool.title}
              >
                <span className="tool-icon tool-icon--muted" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <div className="tool-row-card__body">
                  <p className="calculator-card__category">{tool.category}</p>
                  <div className="tool-row-card__title">
                    <h2>{tool.title}</h2>
                    <span className="status-pill">Próximamente</span>
                  </div>
                  <p>{tool.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
