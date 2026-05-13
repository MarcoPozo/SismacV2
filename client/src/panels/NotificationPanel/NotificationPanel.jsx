import { IoTrashOutline } from "react-icons/io5";
import useActivePanel from "../../hooks/useActivePanel";
import usePanelClose from "../../hooks/usePanelClose";
import useNotificationStore from "../../store/notificationStore";
import "./NotificationPanel.css";

const NotificationPanel = () => {
  const { closePanel } = useActivePanel();
  const toasts = useNotificationStore((s) => s.toasts);
  const panelRef = usePanelClose(closePanel, '[data-panel-trigger="notifications"]');

  return (
    <div className="notif-panel" ref={panelRef}>
      <div className="notif-panel__header">
        <span className="notif-panel__title">Notificaciones</span>
        {toasts.length > 0 && (
          <button
            className="notif-panel__clear"
            onClick={() => toasts.forEach((t) => useNotificationStore.getState().dismiss(t.id))}
            title="Limpiar todo"
          >
            <IoTrashOutline />
            <span>Limpiar todo</span>
          </button>
        )}
      </div>

      <div className="notif-panel__body">
        {toasts.length === 0 ? (
          <div className="notif-panel__empty">
            <span className="notif-panel__empty-text">No hay notificaciones nuevas</span>
          </div>
        ) : (
          toasts.map((t) => (
            <div key={t.id} className={`notif-panel__item notif-panel__item--${t.type}`}>
              {t.title && <span className="notif-panel__item-title">{t.title}</span>}
              {t.message && <span className="notif-panel__item-msg">{t.message}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
