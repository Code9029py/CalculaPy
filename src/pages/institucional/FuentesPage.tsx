import { PageMeta } from "../../components/PageMeta";
import { sourceRegistry } from "../../data/sourceRegistry";

export function FuentesPage() {
  return (
    <section className="page">
      <PageMeta
        title="Fuentes | CalculaPy"
        description="Registro de fuentes activas usadas por CalculaPy para calculadoras orientativas de Paraguay."
      />
      <div className="page__content prose">
        <p className="eyebrow">Transparencia</p>
        <h1>Fuentes</h1>
        <p>
          CalculaPy separa fuentes oficiales, formulas matematicas generales y
          datos ingresados por el usuario. Esta pagina lista fuentes activas
          usadas por calculadoras publicadas; la fuente se muestra en cada
          calculadora cuando respalda un dato sensible.
        </p>
        <div className="source-table" role="table" aria-label="Fuentes">
          <div className="source-table__row source-table__row--head" role="row">
            <span role="columnheader">Fuente</span>
            <span role="columnheader">Uso</span>
            <span role="columnheader">Tipo</span>
          </div>
          {sourceRegistry.map((source) => (
            <div className="source-table__row" role="row" key={source.name}>
              <span role="cell">
                {source.url ? (
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.name}
                  </a>
                ) : (
                  source.name
                )}
              </span>
              <span role="cell">{source.scope}</span>
              <span role="cell">{source.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
