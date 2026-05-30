import { NavLink } from "react-router-dom";

type SiteLayoutProps = {
  children: React.ReactNode;
};

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/calculadoras", label: "Calculadoras" },
  { to: "/metodologia", label: "Metodologia" },
  { to: "/fuentes", label: "Fuentes" },
  { to: "/aviso-importante", label: "Aviso" }
];

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
            Calculadoras utiles y orientativas para Paraguay. No reemplaza
            fuentes oficiales ni asesoramiento profesional.
          </p>
          <div className="site-footer__links">
            <NavLink to="/privacidad">Privacidad</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
