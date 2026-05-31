import { NavLink } from "react-router-dom";

type SiteLayoutProps = {
  children: React.ReactNode;
};

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/calculadoras", label: "Calculadoras" },
  { to: "/contacto", label: "Contacto" }
];

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="site">
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink className="brand" to="/" aria-label="CalcuPY inicio">
            CalcuPY
          </NavLink>
          <nav className="site-nav" aria-label="Navegación principal">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <p className="site-footer__copy">
            <strong>&copy; 2026 CalcuPY.</strong> Resultados orientativos para
            Paraguay.
          </p>
          <NavLink className="site-footer__link" to="/transparencia">
            Transparencia
          </NavLink>
        </div>
      </footer>
      <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
