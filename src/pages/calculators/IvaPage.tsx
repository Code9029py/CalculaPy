import { PageMeta } from "../../components/PageMeta";
import { CalculatorLayout } from "../../components/calculator/CalculatorLayout";
import { IvaCalculator } from "../../calculators/iva/IvaCalculator";
import { ivaMetadata } from "../../calculators/iva/metadata";

const ivaPageDescription =
  "Calculá IVA 5% o 10% para agregarlo a un monto neto o separarlo de un monto con IVA incluido.";

export function IvaPage() {
  return (
    <>
      <PageMeta
        title={`${ivaMetadata.title} | CalculaPy`}
        description={ivaPageDescription}
      />
      <CalculatorLayout
        category={ivaMetadata.category}
        description={ivaPageDescription}
        title={ivaMetadata.title}
      >
        <IvaCalculator />
      </CalculatorLayout>
    </>
  );
}
