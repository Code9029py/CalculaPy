import { PageMeta } from "../../components/PageMeta";
import { globalDisclaimer } from "../../data/legalNotices";

const noticeItems = [
  "Los resultados son informativos y orientativos.",
  "El calculo depende de los datos ingresados por el usuario.",
  "Pueden existir cambios normativos, errores o situaciones particulares.",
  "Antes de tomar decisiones relevantes, se debe verificar con fuentes oficiales o profesionales competentes."
];

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
        <div className="content-grid content-grid--two">
          <section className="content-card content-card--notice">
            <h2>Resumen claro</h2>
            <ul>
              {noticeItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="content-card">
            <h2>Texto base</h2>
            <p>{globalDisclaimer}</p>
          </section>
        </div>
      </div>
    </section>
  );
}
