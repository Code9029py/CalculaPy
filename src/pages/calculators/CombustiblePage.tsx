import { CombustibleCalculator } from "../../calculators/combustible/CombustibleCalculator";
import { combustibleMetadata } from "../../calculators/combustible/metadata";
import { PageMeta } from "../../components/PageMeta";
import { CalculatorLayout } from "../../components/calculator/CalculatorLayout";

const combustiblePageDescription =
  "Estimá litros y costo de combustible para un viaje o para gastos mensuales.";

export function CombustiblePage() {
  return (
    <>
      <PageMeta
        title={`${combustibleMetadata.title} | CalculaPy`}
        description={combustiblePageDescription}
      />
      <CalculatorLayout
        category={combustibleMetadata.category}
        description={combustiblePageDescription}
        title={combustibleMetadata.title}
      >
        <CombustibleCalculator />
      </CalculatorLayout>
    </>
  );
}
