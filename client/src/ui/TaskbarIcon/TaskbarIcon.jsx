import useAppWindow from "../../hooks/useAppWindow";
import "./TaskbarIcon.css";

const TaskbarIcon = ({ appId, title, icon, reactIcon, onAction, isActive, panelTrigger }) => {
  const { win, openWindow, focusWindow, minimizeWindow } = useAppWindow(appId);

  const isPanelMode = !!onAction;
  const isOpen = !!win;
  const isMinimized = win?.isMinimized ?? false;
  const isFocused = win?.isFocused ?? false;

  const getModifier = () => {
    if (isPanelMode) return isActive ? "taskbar-icon--focused" : "";
    if (!isOpen) return "";
    if (isFocused && !isMinimized) return "taskbar-icon--focused";
    return "taskbar-icon--open";
  };

  const handleClick = () => {
    if (isPanelMode) {
      onAction();
      return;
    }
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
      data-panel-trigger={panelTrigger}
    >
      {reactIcon ? (
        <span className="taskbar-icon__react-icon">{reactIcon}</span>
      ) : (
        <img className="taskbar-icon__img" src={icon} alt={title} draggable={false} />
      )}
      {!isPanelMode && isOpen && <span className="taskbar-icon__dot" />}
    </button>
  );
};

export default TaskbarIcon;
