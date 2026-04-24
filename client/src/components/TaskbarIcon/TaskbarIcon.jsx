import './TaskbarIcon.css';
import useWindowStore from '../../store/windowStore';

const TaskbarIcon = ({ appId, title, icon }) => {
  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);

  const win = windows.find((w) => w.id === appId);
  const isOpen = !!win;
  const isMinimized = win?.isMinimized ?? false;
  const isFocused = win?.isFocused ?? false;

  const getModifier = () => {
    if (!isOpen) return '';
    if (isFocused && !isMinimized) return 'taskbar-icon--focused';
    if (isOpen) return 'taskbar-icon--open';
    return '';
  };

  const handleClick = () => {
    if (!isOpen) {
      openWindow(appId);
      return;
    }
    if (isFocused && !isMinimized) {
      minimizeWindow(appId);
      return;
    }
    focusWindow(appId);
  };

  return (
    <button
      className={`taskbar-icon ${getModifier()}`}
      onClick={handleClick}
      title={title}
    >
      <img
        className="taskbar-icon__img"
        src={icon}
        alt={title}
        draggable={false}
      />
      {isOpen && <span className="taskbar-icon__dot" />}
    </button>
  );
};

export default TaskbarIcon;
