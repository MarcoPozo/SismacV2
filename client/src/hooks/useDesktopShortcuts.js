import { useEffect } from 'react';
import useWindowStore from '../store/windowStore';
import usePanelStore from '../store/panelStore';
import useContextMenuStore from '../store/contextMenuStore';

const useDesktopShortcuts = () => {
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
        const { windows, minimizeWindow } = useWindowStore.getState();
        windows.forEach((w) => { if (!w.isMinimized) minimizeWindow(w.id); });
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
};

export default useDesktopShortcuts;
