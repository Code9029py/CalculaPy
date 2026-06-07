import { PresupuestoCalculator } from "../../calculators/presupuesto/PresupuestoCalculator";
import { presupuestoMetadata } from "../../calculators/presupuesto/metadata";
import { PageMeta } from "../../components/PageMeta";
import { CalculatorLayout } from "../../components/calculator/CalculatorLayout";

const presupuestoPageDescription =
  "Estimá ingresos contra gastos y revisá saldo disponible, gastos sobre ingreso y ahorro objetivo.";

export function PresupuestoPage() {
  return (
    <>
      <PageMeta
        title={`${presupuestoMetadata.title} | CalculaPy`}
        description={presupuestoPageDescription}
      />
      <CalculatorLayout
        category={presupuestoMetadata.category}
        description={presupuestoPageDescription}
        title={presupuestoMetadata.title}
      >
        <PresupuestoCalculator />
      </CalculatorLayout>
    </>
  );
}
