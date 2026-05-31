import { PageMeta } from "../../components/PageMeta";

const reportItems = [
  "Calculadora.",
  "Datos ingresados.",
  "Resultado obtenido.",
  "Resultado esperado.",
  "Fuente sugerida, si existe."
];

const contactReasons = [
  "Reportar error",
  "Sugerir calculadora",
  "Sugerir fuente",
  "Consulta general"
];

export function ContactoPage() {
  return (
    <section className="page">
      <PageMeta
        title="Contacto y reporte de errores | CalculaPy"
        description="Canal de contacto y reporte de errores para CalculaPy."
      />
      <div className="page__content">
        <div className="section-heading support-heading">
          <p className="eyebrow">Contacto</p>
          <h1>Contacto y reportes</h1>
          <p>
            Usa esta pagina como guia para preparar reportes o sugerencias antes
            del lanzamiento publico.
          </p>
        </div>

        <div className="contact-actions" aria-label="Motivos de contacto">
          {contactReasons.map((item) => (
            <article className="contact-action" key={item}>
              <span aria-hidden="true">+</span>
              <strong>{item}</strong>
            </article>
          ))}
        </div>

        <section className="support-card support-card--wide">
          <div className="support-card__icon" aria-hidden="true">rep</div>
          <div>
            <h2>Para reportar un error</h2>
            <p>
              Inclui datos suficientes para reproducir el caso, sin enviar
              informacion personal innecesaria.
            </p>
          </div>
          <ul className="compact-list compact-list--inline">
            {reportItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="support-card support-card--notice">
          <h2>Canal de contacto</h2>
          <p>
            El canal de contacto definitivo se configurara antes del lanzamiento
            publico.
          </p>
        </section>
      </div>
    </section>
  );
}
