import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IoExpandOutline,
  IoRefreshOutline,
  IoColorPaletteOutline,
  IoEyeOffOutline,
  IoOpenOutline,
  IoInformationCircleOutline,
} from 'react-icons/io5';
import './Desktop.css';
import Taskbar from '../Taskbar/Taskbar';
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import Window from '../Window/Window';
import SnapPreview from '../SnapPreview/SnapPreview';
import ContextMenu from '../ContextMenu/ContextMenu';
import ToastContainer from '../ToastContainer/ToastContainer';
import appsRegistry from '../../config/appsRegistry';
import useWindowStore from '../../store/windowStore';
import usePanelStore from '../../store/panelStore';
import useContextMenuStore from '../../store/contextMenuStore';

const MENU_ITEM_H = 36;
const MENU_DIVIDER_H = 9;
const MENU_PAD = 8;
const MENU_W = 200;

const openContextMenu = (e, items) => {
  e.preventDefault();
  e.stopPropagation();
  const menuH = items.reduce((h, item) => h + (item.divider ? MENU_DIVIDER_H : MENU_ITEM_H), MENU_PAD);
  const x = Math.min(e.clientX, window.innerWidth - MENU_W - 4);
  const y = Math.min(e.clientY, window.innerHeight - menuH - 52);
  useContextMenuStore.getState().open({ x: Math.max(4, x), y: Math.max(4, y) }, items);
};

const Desktop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);

  const desktopApps = appsRegistry.filter((a) => a.showOnDesktop);

  const windowsReady = useRef(false);

  useEffect(() => {
    const matchedApp = appsRegistry.find((a) => a.route === location.pathname);
    if (matchedApp) {
      openWindow(matchedApp.id);
    } else {
      windowsReady.current = true;
    }
  }, []);

  useEffect(() => {
    if (!windowsReady.current) {
      if (windows.length === 0) return;
      windowsReady.current = true;
    }

    const focused = windows.find((w) => w.isFocused && !w.isMinimized);
    const app = focused ? appsRegistry.find((a) => a.id === focused.id) : null;
    const targetRoute = app?.route ?? '/';

    if (location.pathname !== targetRoute) {
      navigate(targetRoute, { replace: true });
    }
  }, [windows]);

  // Keyboard shortcuts globales
  useEffect(() => {
    let metaAlone = false;

    const handleKeyDown = (e) => {
      if (e.key === 'Meta') { metaAlone = true; return; }
      metaAlone = false;

      if (e.key === 'Escape') {
        usePanelStore.getState().closePanel();
        useContextMenuStore.getState().close();
        return;
      }

      if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        const focused = useWindowStore.getState().windows.find(
          (w) => w.isFocused && !w.isMinimized
        );
        if (focused) useWindowStore.getState().closeWindow(focused.id);
        return;
      }

      if (e.metaKey && (e.key === 'd' || e.key === 'D' || e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        const { windows: ws, minimizeWindow } = useWindowStore.getState();
        ws.forEach((w) => { if (!w.isMinimized) minimizeWindow(w.id); });
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Meta' && metaAlone) {
        usePanelStore.getState().togglePanel('start');
      }
      metaAlone = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleOpenWindow = (appId) => openWindow(appId);

  const handleDesktopContextMenu = (e) => {
    if (!useContextMenuStore.getState().isEnabled) return;
    openContextMenu(e, [
      {
        label: 'Pantalla completa',
        icon: <IoExpandOutline />,
        onClick: () => {
          if (!document.fullscreenElement) document.documentElement.requestFullscreen();
          else document.exitFullscreen();
        },
      },
      {
        label: 'Actualizar',
        icon: <IoRefreshOutline />,
        onClick: () => window.location.reload(),
      },
      {
        label: 'Personalización',
        icon: <IoColorPaletteOutline />,
        onClick: () => openWindow('settings'),
      },
      { divider: true },
      {
        label: 'Deshabilitar menú contextual',
        icon: <IoEyeOffOutline />,
        onClick: () => useContextMenuStore.getState().toggleEnabled(),
      },
    ]);
  };

  const handleIconContextMenu = (e, appId) => {
    if (!useContextMenuStore.getState().isEnabled) return;
    openContextMenu(e, [
      { label: 'Abrir', icon: <IoOpenOutline />, onClick: () => openWindow(appId) },
      { divider: true },
      { label: 'Propiedades', icon: <IoInformationCircleOutline />, onClick: () => {} },
    ]);
  };

  return (
    <div className="desktop" onContextMenu={handleDesktopContextMenu}>
      <div className="desktop__wallpaper" />

      <div className="desktop__icons">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            title={app.title}
            icon={app.icon}
            onOpen={handleOpenWindow}
            onContextMenu={handleIconContextMenu}
          />
        ))}
      </div>

      {windows.map((win) => (
        <Window key={win.id} appId={win.id} />
      ))}

      <SnapPreview />
      <ContextMenu />
      <ToastContainer />
      <Taskbar />
    </div>
  );
};

export default Desktop;
