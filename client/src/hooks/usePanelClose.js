import { useEffect, useRef } from 'react';

const usePanelClose = (closePanel, triggerSelector = '[data-panel-trigger]') => {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (e.target.closest(triggerSelector)) return;
      if (!ref.current?.contains(e.target)) closePanel();
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') closePanel();
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [closePanel, triggerSelector]);

  return ref;
};

export default usePanelClose;
