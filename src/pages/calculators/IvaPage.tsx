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
        lastReviewedAt={ivaMetadata.lastReviewedAt}
        title={ivaMetadata.title}
        aside={
          <div className="sticky-note">
            <h2>Que calcula</h2>
            <p>
              Permite agregar IVA a un monto neto o separar el IVA de un monto
              que ya lo incluye. Usa las tasas 5% y 10%.
            </p>
            <a className="button button--secondary" href="/contacto">
              Reportar error
            </a>
          </div>
        }
      >
        <IvaCalculator />
      </CalculatorLayout>
    </>
  );
}
