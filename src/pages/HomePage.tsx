import { Link } from "react-router-dom";

import { PageMeta } from "../components/PageMeta";

export function HomePage() {
  return (
    <section className="page page--hero">
      <PageMeta
        title="CalculaPy | Calculadoras utiles para Paraguay"
        description="Portal de calculadoras orientativas para Paraguay con formulas transparentes, fuentes visibles y fecha de revision."
      />
      <div className="page__content hero">
        <p className="eyebrow">Paraguay, con fuentes y limites claros</p>
        <h1>Calculadoras utiles y orientativas para Paraguay</h1>
        <p className="hero__lead">
          CalculaPy ayuda a estimar numeros cotidianos con formulas visibles,
          fuentes citadas y avisos honestos sobre el alcance de cada resultado.
        </p>
        <div className="hero__actions">
          <Link className="button button--primary" to="/calculadoras/iva">
            Calcular IVA
          </Link>
          <Link className="button button--secondary" to="/metodologia">
            Ver metodologia
          </Link>
        </div>
      </div>
    </section>
  );
}
