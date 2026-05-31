import { PageMeta } from "../../components/PageMeta";

const privacyItems = [
  {
    title: "Sin cuentas",
    text: "La V1 no requiere registro ni perfil de usuario."
  },
  {
    title: "Calculo local",
    text: "Los datos ingresados se usan en el navegador para generar el resultado."
  },
  {
    title: "Sin backend propio",
    text: "No hay servidor de CalculaPy recibiendo los datos de las calculadoras en esta version."
  }
];

export function PrivacidadPage() {
  return (
    <section className="page">
      <PageMeta
        title="Privacidad | CalculaPy"
        description="Politica de privacidad inicial de CalculaPy para la V1 sin cuentas ni backend."
      />
      <div className="page__content prose">
        <p className="eyebrow">V1</p>
        <h1>Privacidad</h1>
        <div className="content-grid content-grid--three">
          {privacyItems.map((item) => (
            <article className="content-card" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <section className="content-band">
          <p>
            Si en el futuro se agregan analiticas, anuncios, historiales,
            exportaciones o funciones con servidor, esta pagina debera
            actualizarse antes de publicar esos cambios.
          </p>
        </section>
      </div>
    </section>
  );
}
