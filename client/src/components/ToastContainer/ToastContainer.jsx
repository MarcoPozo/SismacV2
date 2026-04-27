import { IoCheckmarkCircleOutline, IoInformationCircleOutline, IoWarningOutline, IoCloseCircleOutline, IoClose } from 'react-icons/io5';
import './ToastContainer.css';
import useNotificationStore from '../../store/notificationStore';

const ICONS = {
  success: <IoCheckmarkCircleOutline />,
  info: <IoInformationCircleOutline />,
  warning: <IoWarningOutline />,
  error: <IoCloseCircleOutline />,
};

const Toast = ({ id, type, title, message, isDismissing }) => {
  const dismiss = useNotificationStore((s) => s.dismiss);

  return (
    <div className={`toast toast--${type}${isDismissing ? ' toast--dismissing' : ''}`}>
      <span className="toast__icon">{ICONS[type]}</span>
      <div className="toast__content">
        {title && <span className="toast__title">{title}</span>}
        {message && <span className="toast__message">{message}</span>}
      </div>
      <button className="toast__close" onClick={() => dismiss(id)} title="Cerrar">
        <IoClose />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const toasts = useNotificationStore((s) => s.toasts);
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} />
      ))}
    </div>
  );
};

export default ToastContainer;
