import { ImportacionCalculator } from "../../calculators/importacion/ImportacionCalculator";
import { importacionMetadata } from "../../calculators/importacion/metadata";
import { PageMeta } from "../../components/PageMeta";
import { CalculatorLayout } from "../../components/calculator/CalculatorLayout";

const importacionPageDescription =
  "Estimá el costo final de una compra internacional cargando precio, envío, tipo de cambio y cargos estimados.";

export function ImportacionPage() {
  return (
    <>
      <PageMeta
        title={`${importacionMetadata.title} | CalculaPy`}
        description={importacionPageDescription}
      />
      <CalculatorLayout
        category={importacionMetadata.category}
        description={importacionPageDescription}
        title={importacionMetadata.title}
      >
        <ImportacionCalculator />
      </CalculatorLayout>
    </>
  );
}
