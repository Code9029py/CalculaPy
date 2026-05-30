import { Link } from "react-router-dom";

import { PageMeta } from "../components/PageMeta";

export function NotFoundPage() {
  return (
    <section className="page">
      <PageMeta
        title="Pagina no encontrada | CalculaPy"
        description="La pagina solicitada no existe en CalculaPy."
      />
      <div className="page__content prose">
        <h1>Pagina no encontrada</h1>
        <p>La direccion puede estar incompleta o haber cambiado.</p>
        <Link className="button button--primary" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
