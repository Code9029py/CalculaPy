import { Link } from "react-router-dom";

import { PageMeta } from "../../components/PageMeta";
import { sourceRegistry } from "../../data/sourceRegistry";

const activeSources = sourceRegistry.filter((source) => source.name === "DNIT");

export function TransparenciaPage() {
  return (
    <section className="page">
      <PageMeta
        title="Transparencia | CalculaPy"
        description="Como CalculaPy construye calculadoras, usa fuentes, explica limites y recibe reportes de errores."
      />
      <div className="page__content">
        <div className="catalog-heading app-page-heading support-page-heading">
          <div>
            <p className="eyebrow">Soporte informativo</p>
            <h1>Transparencia</h1>
            <p>
              Fuentes, limites y reportes para entender el alcance de las
              calculadoras.
            </p>
          </div>
        </div>

        <div className="transparency-layout">
          <section className="support-card support-card--source">
            <div className="support-card__icon" aria-hidden="true">src</div>
            <div>
              <h2>Fuentes y revision</h2>
              <p>
                Las calculadoras muestran fuentes cuando un dato sensible las
                requiere, y fecha de revision dentro de cada herramienta.
              </p>
            </div>
            <ul className="compact-list compact-list--inline">
              {activeSources.map((source) => (
                <li key={source.name}>
                  {source.url ? (
                    <a href={source.url} rel="noreferrer" target="_blank">
                      {source.name}
                    </a>
                  ) : (
                    source.name
                  )}
                  <span>IVA Paraguay</span>
                </li>
              ))}
            </ul>
          </section>
          <div className="support-stack">
            <section className="support-card">
              <div className="support-card__icon" aria-hidden="true">i</div>
              <h2>Limites de uso</h2>
              <p>
                Los resultados son orientativos. Pueden existir cambios, errores
                o casos particulares que modifiquen el resultado final.
              </p>
            </section>
            <section className="support-card support-card--notice">
              <div className="support-card__icon" aria-hidden="true">rep</div>
              <h2>Correcciones y reportes</h2>
              <p>
                Si una calculadora parece incorrecta, prepara el caso en la
                pagina de contacto.
              </p>
              <Link className="inline-link support-link" to="/contacto">
                Ir a contacto
              </Link>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
