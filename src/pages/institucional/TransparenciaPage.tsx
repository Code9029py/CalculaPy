import { Link } from "react-router-dom";

import { PageMeta } from "../../components/PageMeta";
import { sourceRegistry } from "../../data/sourceRegistry";

export function TransparenciaPage() {
  return (
    <section className="page">
      <PageMeta
        title="Transparencia | CalculaPy"
        description="Como CalculaPy construye calculadoras, usa fuentes, explica limites y recibe reportes de errores."
      />
      <div className="page__content">
        <div className="section-heading section-heading--wide">
          <p className="eyebrow">Soporte</p>
          <h1>Transparencia</h1>
          <p>
            Informacion breve sobre fuentes, limites y reportes. La idea es que
            puedas calcular rapido y revisar el respaldo cuando lo necesites.
          </p>
        </div>

        <div className="content-grid content-grid--three">
          <section className="content-card">
            <h2>Fuentes y revision</h2>
            <p>
              Las calculadoras muestran fuentes cuando un dato sensible las
              requiere, y fecha de revision dentro de cada herramienta.
            </p>
            <ul className="compact-list">
              {sourceRegistry.slice(0, 4).map((source) => (
                <li key={source.name}>
                  {source.url ? (
                    <a href={source.url} rel="noreferrer" target="_blank">
                      {source.name}
                    </a>
                  ) : (
                    source.name
                  )}
                  <span>{source.scope}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="content-card content-card--notice">
            <h2>Limites de uso</h2>
            <p>
              Los resultados son orientativos. Pueden existir cambios, errores o
              casos particulares que modifiquen el resultado final.
            </p>
          </section>
          <section className="content-card">
            <h2>Reportar error</h2>
            <p>
              Si una calculadora parece incorrecta o una fuente cambio, envianos
              la calculadora, los datos usados y el resultado esperado.
            </p>
            <Link className="button button--primary" to="/contacto">
              Reportar error
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}
