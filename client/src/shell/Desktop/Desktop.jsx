import { useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoExpandOutline,
  IoRefreshOutline,
  IoColorPaletteOutline,
  IoEyeOffOutline,
  IoOpenOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import "./Desktop.css";
import Taskbar from "../Taskbar/Taskbar";
import Window from "../Window/Window";
import SnapPreview from "../SnapPreview/SnapPreview";
import DesktopIconGrid from "../../ui/DesktopIconGrid/DesktopIconGrid";
import ContextMenu from "../../ui/ContextMenu/ContextMenu";
import ToastContainer from "../../ui/ToastContainer/ToastContainer";
import appsRegistry from "../../config/appsRegistry";
import useWindowStore from "../../store/windowStore";
import useContextMenuStore from "../../store/contextMenuStore";
import useSettingsStore from "../../store/settingsStore";
import useDesktopShortcuts from "../../hooks/useDesktopShortcuts";
import { TASKBAR_H } from "../../config/constants";

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
    MENU_PAD,
  );
  const x = Math.min(e.clientX, window.innerWidth - MENU_W - MENU_MARGIN);
  const y = Math.min(
    e.clientY,
    window.innerHeight - menuH - TASKBAR_H - MENU_MARGIN,
  );
  useContextMenuStore
    .getState()
    .open({ x: Math.max(MENU_MARGIN, x), y: Math.max(MENU_MARGIN, y) }, items);
};

const Desktop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);
  const wallpaper = useSettingsStore((s) => s.wallpaper);
  const windowsReady = useRef(false);

  useDesktopShortcuts();

  useEffect(() => {
    const matchedApp = appsRegistry.find((a) => a.route === location.pathname);
    if (matchedApp) openWindow(matchedApp.id);
    else windowsReady.current = true;
  }, []);

  useEffect(() => {
    if (!windowsReady.current) {
      if (windows.length === 0) return;
      windowsReady.current = true;
    }
    const focused = windows.find((w) => w.isFocused && !w.isMinimized);
    const app = focused ? appsRegistry.find((a) => a.id === focused.id) : null;
    const targetRoute = app?.route ?? "/";
    if (location.pathname !== targetRoute)
      navigate(targetRoute, { replace: true });
  }, [windows]);

  const handleDesktopContextMenu = useCallback(
    (e) => {
      if (!useContextMenuStore.getState().isEnabled) return;
      triggerContextMenu(e, [
        {
          label: "Pantalla completa",
          icon: <IoExpandOutline />,
          onClick: () => {
            if (!document.fullscreenElement)
              document.documentElement.requestFullscreen();
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
    [openWindow],
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
    [openWindow],
  );

  return (
    <div className="desktop" onContextMenu={handleDesktopContextMenu}>
      <div
        className="desktop__wallpaper"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />

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
