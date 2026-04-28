import { useState, useEffect } from 'react';
import {
  IoColorPaletteOutline,
  IoTimeOutline,
  IoInformationCircleOutline,
  IoCheckmark,
  IoSunnyOutline,
  IoMoonOutline,
} from 'react-icons/io5';
import './Settings.css';
import useSettingsStore from '../../store/settingsStore';
import { CAREERS } from '../../config/careersRegistry';

const WALLPAPERS = [
  '/images/wallpapers/bg-1.jpg',
  '/images/wallpapers/bg-2.jpg',
  '/images/wallpapers/bg-3.jpg',
];

const SECTIONS = [
  { id: 'personalizacion', label: 'Personalización', icon: IoColorPaletteOutline },
  { id: 'fecha',           label: 'Fecha y hora',    icon: IoTimeOutline },
  { id: 'acerca',          label: 'Acerca de',       icon: IoInformationCircleOutline },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState('personalizacion');
  const [currentTime, setCurrentTime]     = useState('');
  const [currentDate, setCurrentDate]     = useState('');

  const wallpaper      = useSettingsStore((s) => s.wallpaper);
  const accentColor    = useSettingsStore((s) => s.accentColor);
  const baseMode       = useSettingsStore((s) => s.baseMode);
  const careerTheme    = useSettingsStore((s) => s.careerTheme);
  const setWallpaper   = useSettingsStore((s) => s.setWallpaper);
  const setAccentColor = useSettingsStore((s) => s.setAccentColor);
  const setBaseMode    = useSettingsStore((s) => s.setBaseMode);
  const setCareerTheme = useSettingsStore((s) => s.setCareerTheme);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${h}:${m}:${s}`);
      setCurrentDate(now.toLocaleDateString('es-EC', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="settings">
      <aside className="settings__sidebar">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`settings__sidebar-item${activeSection === id ? ' settings__sidebar-item--active' : ''}`}
            onClick={() => setActiveSection(id)}
          >
            <Icon className="settings__sidebar-icon" />
            <span>{label}</span>
          </button>
        ))}
      </aside>

      <main className="settings__content">

        {activeSection === 'personalizacion' && (
          <>
            <h2 className="settings__section-title">Personalización</h2>
            <p className="settings__section-desc">Ajusta la apariencia visual del sistema.</p>

            {/* Fondo de pantalla */}
            <div className="settings__card">
              <span className="settings__card-label">Fondo de pantalla</span>
              <div className="settings__wallpaper-grid">
                {WALLPAPERS.map((w) => (
                  <button
                    key={w}
                    className={`settings__wallpaper-thumb${wallpaper === w ? ' settings__wallpaper-thumb--active' : ''}`}
                    style={{ backgroundImage: `url(${w})` }}
                    onClick={() => setWallpaper(w)}
                    title={w.split('/').pop()}
                  >
                    {wallpaper === w && (
                      <span className="settings__wallpaper-check"><IoCheckmark /></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Modo claro / oscuro */}
            <div className="settings__card">
              <span className="settings__card-label">Modo</span>
              <div className="settings__mode">
                <button
                  className={`settings__mode-btn${baseMode === 'dark' ? ' settings__mode-btn--active' : ''}`}
                  onClick={() => setBaseMode('dark')}
                >
                  <IoMoonOutline className="settings__mode-icon" />
                  <span>Oscuro</span>
                  {baseMode === 'dark' && <IoCheckmark className="settings__mode-check" />}
                </button>
                <button
                  className={`settings__mode-btn${baseMode === 'light' ? ' settings__mode-btn--active' : ''}`}
                  onClick={() => setBaseMode('light')}
                >
                  <IoSunnyOutline className="settings__mode-icon" />
                  <span>Claro</span>
                  {baseMode === 'light' && <IoCheckmark className="settings__mode-check" />}
                </button>
              </div>
            </div>

            {/* Color de acento */}
            <div className="settings__card">
              <span className="settings__card-label">Color de acento</span>
              <div className="settings__accents">
                {CAREERS.map((c) => (
                  <button
                    key={c.id}
                    className={`settings__accent-swatch${accentColor === c.colors.primary ? ' settings__accent-swatch--active' : ''}`}
                    style={{ background: c.colors.primary, '--swatch-color': c.colors.primary }}
                    title={c.label}
                    onClick={() => setAccentColor(c.colors.primary)}
                  />
                ))}
              </div>
            </div>

            {/* Tema de carrera */}
            <div className="settings__card">
              <span className="settings__card-label">Tema de carrera</span>
              <p className="settings__card-hint">Dale color a la barras superior de las ventanas. Toca de nuevo para desactivar.</p>
              <div className="settings__career-grid">
                {CAREERS.map((career) => {
                  const Icon = career.icon;
                  const isActive = careerTheme === career.id;
                  return (
                    <button
                      key={career.id}
                      className={`settings__career-item${isActive ? ' settings__career-item--active' : ''}`}
                      style={{ '--career-color': career.colors.primary }}
                      onClick={() => setCareerTheme(isActive ? null : career.id)}
                      title={career.label}
                    >
                      <div
                        className="settings__career-icon-wrap"
                        style={{ background: career.colors.primary }}
                      >
                        <Icon />
                      </div>
                      <span className="settings__career-name">{career.label}</span>
                      {isActive && (
                        <span className="settings__career-check"><IoCheckmark /></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {activeSection === 'fecha' && (
          <>
            <h2 className="settings__section-title">Fecha y hora</h2>
            <p className="settings__section-desc">Información del reloj del sistema.</p>

            <div className="settings__card">
              <span className="settings__card-label">Hora actual</span>
              <p className="settings__clock-time">{currentTime}</p>
            </div>
            <div className="settings__card">
              <span className="settings__card-label">Fecha</span>
              <p className="settings__clock-date">{currentDate}</p>
            </div>
            <div className="settings__card">
              <span className="settings__card-label">Zona horaria</span>
              <p className="settings__clock-zone">{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
            </div>
          </>
        )}

        {activeSection === 'acerca' && (
          <>
            <h2 className="settings__section-title">Acerca de</h2>
            <p className="settings__section-desc">Información del sistema ISMAC.</p>

            <div className="settings__card">
              <div className="settings__about-row">
                <span className="settings__about-key">Sistema</span>
                <span className="settings__about-val">Sismac</span>
              </div>
              <div className="settings__about-row">
                <span className="settings__about-key">Versión</span>
                <span className="settings__about-val">2.0.0</span>
              </div>
              <div className="settings__about-row">
                <span className="settings__about-key">Año</span>
                <span className="settings__about-val">{new Date().getFullYear()}</span>
              </div>
            </div>

            <div className="settings__card">
              <span className="settings__card-label">Créditos</span>
              <p className="settings__credits">
                Desarrollado por el equipo de sistemas del Instituto Universitario ISMAC.
              </p>
            </div>
          </>
        )}

      </main>
    </div>
  );
};

export default Settings;
