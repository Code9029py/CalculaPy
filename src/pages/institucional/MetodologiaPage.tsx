import { PageMeta } from "../../components/PageMeta";

export function MetodologiaPage() {
  return (
    <section className="page">
      <PageMeta
        title="Metodologia | CalculaPy"
        description="Como CalculaPy define formulas, fuentes, fechas de revision y avisos para sus calculadoras orientativas."
      />
      <div className="page__content prose">
        <p className="eyebrow">Metodo</p>
        <h1>Metodologia</h1>
        <p>
          CalculaPy prioriza calculadoras utiles, claras, honestas y
          verificables. Cada herramienta debe explicar que calcula, como lo
          calcula, de donde salen los datos sensibles y que limites tiene el
          resultado.
        </p>
        <h2>Criterios de publicacion</h2>
        <ul>
          <li>Formula visible y separada del componente visual.</li>
          <li>Validaciones para evitar montos negativos o datos imposibles.</li>
          <li>Fuentes citadas cuando respaldan un dato sensible.</li>
          <li>Fecha de ultima revision visible.</li>
          <li>Aviso orientativo claro, sin prometer exactitud absoluta.</li>
        </ul>
        <h2>Riesgo por calculadora</h2>
        <p>
          Las calculadoras de bajo riesgo pueden publicarse antes si sus
          supuestos son simples y visibles. Las de riesgo medio o alto requieren
          mayor revision antes de estar disponibles.
        </p>
      </div>
    </section>
  );
}
