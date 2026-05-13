import useWindowStore from '../store/windowStore';

const useAppWindow = (appId) => {
  const win            = useWindowStore((s) => s.windows.find((w) => w.id === appId) ?? null);
  const openWindow     = useWindowStore((s) => s.openWindow);
  const closeWindow    = useWindowStore((s) => s.closeWindow);
  const destroyWindow  = useWindowStore((s) => s.destroyWindow);
  const focusWindow    = useWindowStore((s) => s.focusWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const finishMinimize = useWindowStore((s) => s.finishMinimize);
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow);

  return {
    win,
    openWindow,
    closeWindow,
    destroyWindow,
    focusWindow,
    minimizeWindow,
    finishMinimize,
    maximizeWindow,
  };
};

export default useAppWindow;
