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
      <div className="page__content prose">
        <p className="eyebrow">Contacto</p>
        <h1>Contacto y reportes</h1>
        <div className="content-grid content-grid--two">
          <section className="content-card">
            <h2>Motivo</h2>
            <ul>
              {contactReasons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="content-card">
            <h2>Para reportar un error</h2>
            <p>
              Inclui datos suficientes para poder reproducir el caso, sin enviar
              informacion personal innecesaria.
            </p>
          </section>
        </div>
        <section className="content-card">
          <h2>Datos utiles</h2>
          <ul>
            {reportItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="content-band">
          <div>
            <h2>Canal de contacto</h2>
            <p>
              Como esta V1 no tiene backend ni correo definitivo, el canal de
              contacto se configurara antes del lanzamiento publico. Mientras
              tanto, usa esta lista como guia para preparar el reporte.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
