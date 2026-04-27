import './TaskbarIcon.css';
import useWindowStore from '../../store/windowStore';

const TaskbarIcon = ({ appId, title, icon, onAction, isActive, panelTrigger }) => {
  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);

  const isPanelMode = !!onAction;

  const win = !isPanelMode ? windows.find((w) => w.id === appId) : null;
  const isOpen = !!win;
  const isMinimized = win?.isMinimized ?? false;
  const isFocused = win?.isFocused ?? false;

  const getModifier = () => {
    if (isPanelMode) return isActive ? 'taskbar-icon--focused' : '';
    if (!isOpen) return '';
    if (isFocused && !isMinimized) return 'taskbar-icon--focused';
    return 'taskbar-icon--open';
  };

  const handleClick = () => {
    if (isPanelMode) {
      onAction();
      return;
    }
    if (!isOpen) { openWindow(appId); return; }
    if (isFocused && !isMinimized) { minimizeWindow(appId); return; }
    focusWindow(appId);
  };

  return (
    <button
      className={`taskbar-icon ${getModifier()}`}
      onClick={handleClick}
      title={title}
      data-panel-trigger={panelTrigger}
    >
      <img
        className="taskbar-icon__img"
        src={icon}
        alt={title}
        draggable={false}
      />
      {!isPanelMode && isOpen && <span className="taskbar-icon__dot" />}
    </button>
  );
};

export default TaskbarIcon;
