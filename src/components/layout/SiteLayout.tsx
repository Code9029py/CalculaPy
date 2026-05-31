import { NavLink } from "react-router-dom";

type SiteLayoutProps = {
  children: React.ReactNode;
};

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/calculadoras", label: "Calculadoras" },
  { to: "/contacto", label: "Contacto" }
];

const footerLinks = [{ to: "/transparencia", label: "Transparencia" }];

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="site">
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink className="brand" to="/" aria-label="CalculaPy inicio">
            CalculaPy
          </NavLink>
          <nav className="site-nav" aria-label="Navegacion principal">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <p>
            <strong>&copy; 2026 CalculaPy.</strong> Resultados orientativos para
            Paraguay.
          </p>
          <div className="site-footer__links">
            {footerLinks.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </footer>
      <nav className="mobile-bottom-nav" aria-label="Navegacion movil">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
