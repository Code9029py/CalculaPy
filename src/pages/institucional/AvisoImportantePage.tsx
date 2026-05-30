import { PageMeta } from "../../components/PageMeta";
import { globalDisclaimer } from "../../data/legalNotices";

export function AvisoImportantePage() {
  return (
    <section className="page">
      <PageMeta
        title="Aviso importante | CalculaPy"
        description="Aviso de alcance de las calculadoras de CalculaPy: resultados informativos y orientativos."
      />
      <div className="page__content prose">
        <p className="eyebrow">Alcance</p>
        <h1>Aviso importante</h1>
        <p>{globalDisclaimer}</p>
      </div>
    </section>
  );
}
