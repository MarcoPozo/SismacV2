import { useEffect, useRef } from "react";
import { IoTrashOutline } from "react-icons/io5";
import "./NotificationPanel.css";
import usePanelStore from "../../store/panelStore";
import useNotificationStore from "../../store/notificationStore";

const NotificationPanel = () => {
  const closePanel = usePanelStore((s) => s.closePanel);
  const toasts = useNotificationStore((s) => s.toasts);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !e.target.closest('[data-panel-trigger="notifications"]')
      ) {
        closePanel();
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [closePanel]);

  return (
    <div className="notif-panel" ref={panelRef}>
      <div className="notif-panel__header">
        <span className="notif-panel__title">Notificaciones</span>
        {toasts.length > 0 && (
          <button
            className="notif-panel__clear"
            onClick={() =>
              toasts.forEach((t) =>
                useNotificationStore.getState().dismiss(t.id),
              )
            }
            title="Limpiar todo">
            <IoTrashOutline />
            <span>Limpiar todo</span>
          </button>
        )}
      </div>

      <div className="notif-panel__body">
        {toasts.length === 0 ? (
          <div className="notif-panel__empty">
            <span className="notif-panel__empty-text">
              No hay notificaciones nuevas
            </span>
          </div>
        ) : (
          toasts.map((t) => (
            <div
              key={t.id}
              className={`notif-panel__item notif-panel__item--${t.type}`}>
              {t.title && (
                <span className="notif-panel__item-title">{t.title}</span>
              )}
              {t.message && (
                <span className="notif-panel__item-msg">{t.message}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
