import { PageMeta } from "../../components/PageMeta";

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
        <p>
          En esta version inicial, CalculaPy funciona como una aplicacion
          frontend sin cuentas de usuario. Los datos ingresados en las
          calculadoras se usan en el navegador para generar el resultado y no se
          envian a un servidor propio.
        </p>
        <p>
          Si en el futuro se agregan analiticas, anuncios, historiales,
          exportaciones o funciones con servidor, esta pagina debera actualizarse
          antes de publicar esos cambios.
        </p>
      </div>
    </section>
  );
}
