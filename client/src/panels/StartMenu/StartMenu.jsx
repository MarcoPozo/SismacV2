import { useState, useMemo, useCallback } from "react";
import { IoMdPower } from "react-icons/io";
import { IoAppsOutline } from "react-icons/io5";
import "./StartMenu.css";
import appsRegistry from "../../config/appsRegistry";
import useActivePanel from "../../hooks/useActivePanel";
import usePanelClose from "../../hooks/usePanelClose";
import useWindowStore from "../../store/windowStore";

const pinnedApps = appsRegistry.filter((a) => a.pinToStartMenu);
const allApps = [...appsRegistry].sort((a, b) =>
  a.title.localeCompare(b.title),
);

const StartMenu = () => {
  const { closePanel } = useActivePanel();
  const openWindow     = useWindowStore((s) => s.openWindow);
  const windows        = useWindowStore((s) => s.windows);
  const panelRef       = usePanelClose(closePanel);
  const [showAllApps, setShowAllApps] = useState(false);

  const recentApps = useMemo(
    () =>
      [...windows]
        .sort((a, b) => b.zIndex - a.zIndex)
        .slice(0, 4)
        .map((w) => appsRegistry.find((a) => a.id === w.id))
        .filter(Boolean),
    [windows],
  );

  const handleOpenApp = useCallback(
    (appId) => {
      openWindow(appId);
      closePanel();
    },
    [openWindow, closePanel],
  );

  return (
    <div className="start-menu" ref={panelRef}>
      {showAllApps ? (
        <div className="start-menu__section start-menu__section--all">
          <div className="start-menu__section-header">
            <button
              className="start-menu__back"
              onClick={() => setShowAllApps(false)}>
              ‹ Anclado
            </button>
          </div>
          <div className="start-menu__all-list">
            {allApps.map((app) => (
              <button
                key={app.id}
                className="start-menu__all-item"
                onClick={() => handleOpenApp(app.id)}>
                <img
                  className="start-menu__all-icon"
                  src={app.icon}
                  alt={app.title}
                  draggable={false}
                />
                <span className="start-menu__all-label">{app.title}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="start-menu__section">
            <div className="start-menu__section-header">
              <span className="start-menu__section-title">Anclado</span>
              <button
                className="start-menu__all-apps"
                onClick={() => setShowAllApps(true)}>
                <IoAppsOutline />
                <span>Todas las apps</span>
              </button>
            </div>
            <div className="start-menu__pinned-grid">
              {pinnedApps.map((app) => (
                <button
                  key={app.id}
                  className="start-menu__pin"
                  onClick={() => handleOpenApp(app.id)}
                  title={app.title}>
                  <img
                    className="start-menu__pin-icon"
                    src={app.icon}
                    alt={app.title}
                    draggable={false}
                  />
                  <span className="start-menu__pin-label">{app.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="start-menu__section start-menu__section--recommended">
            <div className="start-menu__section-header">
              <span className="start-menu__section-title">Reciente</span>
            </div>
            {recentApps.length > 0 ? (
              <div className="start-menu__recent-list">
                {recentApps.map((app) => (
                  <button
                    key={app.id}
                    className="start-menu__recent-item"
                    onClick={() => handleOpenApp(app.id)}>
                    <img
                      className="start-menu__recent-icon"
                      src={app.icon}
                      alt={app.title}
                      draggable={false}
                    />
                    <span className="start-menu__recent-label">
                      {app.title}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="start-menu__empty">Nada reciente</p>
            )}
          </div>
        </>
      )}

      <div className="start-menu__footer">
        <button className="start-menu__user">
          <div className="start-menu__user-avatar" />
          <span className="start-menu__user-name">ISMAC</span>
        </button>
        <button
          className="start-menu__power"
          title="Reiniciar sistema"
          onClick={() => window.location.reload()}>
          <IoMdPower />
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
