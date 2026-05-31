import { Link } from "react-router-dom";

import { PageMeta } from "../components/PageMeta";

export function NotFoundPage() {
  return (
    <section className="page">
      <PageMeta
        title="Página no encontrada | CalcuPY"
        description="La página solicitada no existe en CalcuPY."
      />
      <div className="page__content prose">
        <h1>Página no encontrada</h1>
        <p>La dirección puede estar incompleta o haber cambiado.</p>
        <Link className="button button--primary" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
