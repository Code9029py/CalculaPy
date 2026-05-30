import { PageMeta } from "../../components/PageMeta";
import { ivaMetadata } from "../../calculators/iva/metadata";

export function IvaPage() {
  return (
    <section className="page">
      <PageMeta
        title={`${ivaMetadata.title} | CalculaPy`}
        description={ivaMetadata.description}
      />
      <div className="page__content prose">
        <p className="eyebrow">{ivaMetadata.category}</p>
        <h1>{ivaMetadata.title}</h1>
        <p>{ivaMetadata.description}</p>
        <p>La calculadora interactiva se implementa en el siguiente bloque.</p>
      </div>
    </section>
  );
}
