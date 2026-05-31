import { PageMeta } from "../../components/PageMeta";
import { CalculatorLayout } from "../../components/calculator/CalculatorLayout";
import { IvaCalculator } from "../../calculators/iva/IvaCalculator";
import { ivaMetadata } from "../../calculators/iva/metadata";

export function IvaPage() {
  return (
    <>
      <PageMeta
        title={`${ivaMetadata.title} | CalculaPy`}
        description={ivaMetadata.description}
      />
      <CalculatorLayout
        category={ivaMetadata.category}
        description={ivaMetadata.description}
        title={ivaMetadata.title}
      >
        <IvaCalculator />
      </CalculatorLayout>
    </>
  );
}
