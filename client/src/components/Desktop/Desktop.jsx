import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Desktop.css';
import Taskbar from '../Taskbar/Taskbar';
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import Window from '../Window/Window';
import appsRegistry from '../../config/appsRegistry';
import useWindowStore from '../../store/windowStore';

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

  const handleOpenWindow = (appId) => {
    openWindow(appId);
  };

  return (
    <div className="desktop">
      <div className="desktop__wallpaper" />

      <div className="desktop__icons">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            title={app.title}
            icon={app.icon}
            onOpen={handleOpenWindow}
          />
        ))}
      </div>

      {windows.map((win) => (
        <Window key={win.id} appId={win.id} />
      ))}

      <Taskbar />
    </div>
  );
};

export default Desktop;
