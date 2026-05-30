import { PageMeta } from "../../components/PageMeta";

export function ContactoPage() {
  return (
    <section className="page">
      <PageMeta
        title="Contacto y reporte de errores | CalculaPy"
        description="Canal de contacto y reporte de errores para CalculaPy."
      />
      <div className="page__content prose">
        <p className="eyebrow">Reportar</p>
        <h1>Contacto y reporte de errores</h1>
        <p>
          Si encontraste un error, una fuente desactualizada o una explicacion
          poco clara, podes reportarlo indicando la calculadora, los datos
          ingresados y el resultado esperado.
        </p>
        <p>
          El canal definitivo de contacto se definira antes del lanzamiento
          publico. Mientras tanto, esta pagina deja preparada la ruta necesaria
          para la V1.
        </p>
      </div>
    </section>
  );
}
