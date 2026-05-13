import { Suspense } from "react";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";
import appsRegistry from "../../config/appsRegistry";
import { DRAG_Z } from "../../config/constants";
import useAppWindow from "../../hooks/useAppWindow";
import useDrag from "../../hooks/useDrag";
import "./Window.css";

const SNAP_POSITIONS = {
  left: {
    top: 0,
    left: 0,
    width: "50vw",
    height: "calc(100vh - var(--sm-taskbar-h))",
  },
  right: {
    top: 0,
    left: "50vw",
    width: "50vw",
    height: "calc(100vh - var(--sm-taskbar-h))",
  },
};

const Window = ({ appId }) => {
  const {
    win,
    closeWindow,
    destroyWindow,
    minimizeWindow,
    finishMinimize,
    maximizeWindow,
    focusWindow,
  } = useAppWindow(appId);

  const app = appsRegistry.find((a) => a.id === appId);
  const { handleMouseDown } = useDrag(appId);

  if (!win || !app) return null;

  const {
    position,
    size,
    zIndex,
    isDragging,
    isMinimized,
    isMinimizing,
    isMaximized,
    isSnapped,
    snapType,
    isFocused,
    isClosing,
  } = win;

  const effectiveZ = isDragging ? DRAG_Z : zIndex;
  const PageComponent = app.component;

  const style = isMaximized
    ? {
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - var(--sm-taskbar-h))",
        zIndex: effectiveZ,
      }
    : isSnapped && snapType
      ? { ...SNAP_POSITIONS[snapType], zIndex: effectiveZ }
      : {
          top: position.y,
          left: position.x,
          width: size.width,
          height: size.height,
          zIndex: effectiveZ,
        };

  const windowClass = [
    "window",
    isFocused ? "window--focused" : "",
    isMaximized || isSnapped ? "window--maximized" : "",
    isMinimized ? "window--minimized" : "",
    isMinimizing ? "window--minimizing" : "",
    isClosing ? "window--closing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleWindowMouseDown = () => {
    if (!isFocused) focusWindow(appId);
  };

  const handleAnimationEnd = (e) => {
    if (e.animationName === "windowClose") destroyWindow(appId);
    if (e.animationName === "windowMinimize") finishMinimize(appId);
  };

  return (
    <div
      id={`window-${appId}`}
      className={windowClass}
      style={style}
      onMouseDown={handleWindowMouseDown}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className="window__titlebar"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => maximizeWindow(appId)}
      >
        <div className="window__titlebar-left">
          <img className="window__icon" src={app.icon} alt={app.title} draggable={false} />
          <span className="window__title">{app.title}</span>
        </div>
        <div className="window__controls">
          <button
            className="window__controls-btn window__controls-btn--minimize"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(appId);
            }}
            title="Minimizar"
          >
            <VscChromeMinimize />
          </button>
          <button
            className="window__controls-btn window__controls-btn--maximize"
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(appId);
            }}
            title={isMaximized ? "Restaurar" : "Maximizar"}
          >
            {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
          </button>
          <button
            className="window__controls-btn window__controls-btn--close"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(appId);
            }}
            title="Cerrar"
          >
            <VscChromeClose />
          </button>
        </div>
      </div>

      <div className="window__body">
        <Suspense fallback={<div className="window__loading">Cargando...</div>}>
          <PageComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default Window;
