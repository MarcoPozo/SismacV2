import "./AppHeader.css";

const AppHeader = ({
  title,
  eyebrow = "Instituto Universitario ISMAC",
  logoSrc = "/images/icons/icon-ismac.webp",
  logoAlt = "ISMAC",
}) => (
  <header className="app-header">
    <div className="app-header__deco" aria-hidden="true">
      <span className="app-header__diamond app-header__diamond--a" />
      <span className="app-header__diamond app-header__diamond--b" />
      <span className="app-header__diamond app-header__diamond--c" />
      <span className="app-header__diamond app-header__diamond--d" />
    </div>
    <img className="app-header__logo" src={logoSrc} alt={logoAlt} draggable={false} />
    <div className="app-header__info">
      <span className="app-header__eyebrow">{eyebrow}</span>
      <span className="app-header__title">{title}</span>
    </div>
  </header>
);

export default AppHeader;
