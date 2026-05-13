import { useCallback, useEffect, useRef } from "react";
import {
  IoColorPaletteOutline,
  IoExpandOutline,
  IoEyeOffOutline,
  IoInformationCircleOutline,
  IoOpenOutline,
  IoRefreshOutline,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import appsRegistry from "../../config/appsRegistry";
import { TASKBAR_H } from "../../config/constants";
import useAppSettings from "../../hooks/useAppSettings";
import useDesktopShortcuts from "../../hooks/useDesktopShortcuts";
import useContextMenuStore from "../../store/contextMenuStore";
import useWindowStore from "../../store/windowStore";
import ContextMenu from "../../ui/ContextMenu/ContextMenu";
import DesktopIconGrid from "../../ui/DesktopIconGrid/DesktopIconGrid";
import ToastContainer from "../../ui/ToastContainer/ToastContainer";
import SnapPreview from "../SnapPreview/SnapPreview";
import Taskbar from "../Taskbar/Taskbar";
import Window from "../Window/Window";
import "./Desktop.css";

const MENU_ITEM_H = 36;
const MENU_DIVIDER_H = 9;
const MENU_PAD = 8;
const MENU_W = 200;
const MENU_MARGIN = 4;

const desktopApps = appsRegistry.filter((a) => a.showOnDesktop);

const triggerContextMenu = (e, items) => {
  e.preventDefault();
  e.stopPropagation();
  const menuH = items.reduce(
    (h, item) => h + (item.divider ? MENU_DIVIDER_H : MENU_ITEM_H),
    MENU_PAD
  );
  const x = Math.min(e.clientX, window.innerWidth - MENU_W - MENU_MARGIN);
  const y = Math.min(e.clientY, window.innerHeight - menuH - TASKBAR_H - MENU_MARGIN);
  useContextMenuStore
    .getState()
    .open({ x: Math.max(MENU_MARGIN, x), y: Math.max(MENU_MARGIN, y) }, items);
};

const Desktop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);
  const { wallpaper } = useAppSettings();
  const windowsReady = useRef(false);
  const initialPathRef = useRef(location.pathname);

  useDesktopShortcuts();

  // Abre la ventana correspondiente a la URL inicial (solo en mount)
  useEffect(() => {
    const matchedApp = appsRegistry.find((a) => a.route === initialPathRef.current);
    if (matchedApp) openWindow(matchedApp.id);
    else windowsReady.current = true;
  }, [openWindow]);

  // Sincroniza la URL con la ventana activa
  useEffect(() => {
    if (!windowsReady.current) {
      if (windows.length === 0) return;
      windowsReady.current = true;
    }
    const focused = windows.find((w) => w.isFocused && !w.isMinimized);
    const app = focused ? appsRegistry.find((a) => a.id === focused.id) : null;
    const targetRoute = app?.route ?? "/";
    if (location.pathname !== targetRoute) navigate(targetRoute, { replace: true });
  }, [windows, location.pathname, navigate]);

  const handleDesktopContextMenu = useCallback(
    (e) => {
      if (!useContextMenuStore.getState().isEnabled) return;
      triggerContextMenu(e, [
        {
          label: "Pantalla completa",
          icon: <IoExpandOutline />,
          onClick: () => {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen();
            else document.exitFullscreen();
          },
        },
        {
          label: "Actualizar",
          icon: <IoRefreshOutline />,
          onClick: () => window.location.reload(),
        },
        {
          label: "Personalización",
          icon: <IoColorPaletteOutline />,
          onClick: () => openWindow("settings"),
        },
        { divider: true },
        {
          label: "Deshabilitar menú contextual",
          icon: <IoEyeOffOutline />,
          onClick: () => useContextMenuStore.getState().toggleEnabled(),
        },
      ]);
    },
    [openWindow]
  );

  const handleIconContextMenu = useCallback(
    (e, appId) => {
      if (!useContextMenuStore.getState().isEnabled) return;
      triggerContextMenu(e, [
        {
          label: "Abrir",
          icon: <IoOpenOutline />,
          onClick: () => openWindow(appId),
        },
        { divider: true },
        {
          label: "Propiedades",
          icon: <IoInformationCircleOutline />,
          onClick: () => openWindow(appId),
        },
      ]);
    },
    [openWindow]
  );

  return (
    <div className="desktop" onContextMenu={handleDesktopContextMenu}>
      <div className="desktop__wallpaper" style={{ backgroundImage: `url(${wallpaper})` }} />

      <DesktopIconGrid
        apps={desktopApps}
        onOpen={openWindow}
        onContextMenu={handleIconContextMenu}
      />

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
