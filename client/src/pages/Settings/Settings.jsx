import "./Settings.css";
import {
  IoColorPaletteOutline,
  IoTimeOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

const Settings = () => {
  return (
    <div className="settings">
      <aside className="settings__sidebar">
        <button className="settings__sidebar-item settings__sidebar-item--active">
          <IoColorPaletteOutline className="settings__sidebar-icon" />
          <span>Personalización</span>
        </button>
        <button className="settings__sidebar-item">
          <IoTimeOutline className="settings__sidebar-icon" />
          <span>Fecha y hora</span>
        </button>
        <button className="settings__sidebar-item">
          <IoInformationCircleOutline className="settings__sidebar-icon" />
          <span>Acerca de</span>
        </button>
      </aside>

      <main className="settings__content">
        <h2 className="settings__section-title">Personalización</h2>
        <p className="settings__section-desc">
          Aquí podrás personalizar la apariencia del sistema.
        </p>

        <div className="settings__card">
          <span className="settings__card-label">Fondo de pantalla</span>
          <p className="settings__card-hint">Próximamente disponible.</p>
        </div>

        <div className="settings__card">
          <span className="settings__card-label">Color de acento</span>
          <p className="settings__card-hint">Próximamente disponible.</p>
        </div>
      </main>
    </div>
  );
};

export default Settings;
