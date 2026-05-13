import usePanelStore from '../store/panelStore';

const useActivePanel = () => {
  const activePanel = usePanelStore((s) => s.activePanel);
  const togglePanel = usePanelStore((s) => s.togglePanel);
  const closePanel  = usePanelStore((s) => s.closePanel);

  return { activePanel, togglePanel, closePanel };
};

export default useActivePanel;
