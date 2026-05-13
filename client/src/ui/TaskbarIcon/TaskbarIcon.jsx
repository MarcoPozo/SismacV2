import './TaskbarIcon.css';
import useWindowStore from '../../store/windowStore';

const TaskbarIcon = ({ appId, title, icon, reactIcon, onAction, isActive, panelTrigger }) => {
  const win          = useWindowStore((s) => s.windows.find((w) => w.id === appId) ?? null);
  const openWindow   = useWindowStore((s) => s.openWindow);
  const focusWindow  = useWindowStore((s) => s.focusWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);

  const isPanelMode = !!onAction;
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
      {reactIcon
        ? <span className="taskbar-icon__react-icon">{reactIcon}</span>
        : <img className="taskbar-icon__img" src={icon} alt={title} draggable={false} />
      }
      {!isPanelMode && isOpen && <span className="taskbar-icon__dot" />}
    </button>
  );
};

export default TaskbarIcon;
