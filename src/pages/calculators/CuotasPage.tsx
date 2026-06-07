import { cuotasMetadata } from "../../calculators/cuotas/metadata";
import { CuotasCalculator } from "../../calculators/cuotas/CuotasCalculator";
import { PageMeta } from "../../components/PageMeta";
import { CalculatorLayout } from "../../components/calculator/CalculatorLayout";

const cuotasPageDescription =
  "Compará precio contado contra pago en cuotas y estimá total pagado, diferencia y sobrecosto.";

export function CuotasPage() {
  return (
    <>
      <PageMeta
        title={`${cuotasMetadata.title} | CalculaPy`}
        description={cuotasPageDescription}
      />
      <CalculatorLayout
        category={cuotasMetadata.category}
        description={cuotasPageDescription}
        title={cuotasMetadata.title}
      >
        <CuotasCalculator />
      </CalculatorLayout>
    </>
  );
}
