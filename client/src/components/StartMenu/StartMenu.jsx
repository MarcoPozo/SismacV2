import { useEffect, useRef } from 'react';
import { IoMdPower } from 'react-icons/io';
import './StartMenu.css';
import usePanelStore from '../../store/panelStore';

const StartMenu = () => {
  const closePanel = usePanelStore((s) => s.closePanel);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest('[data-panel-trigger]')) return;
      if (!panelRef.current?.contains(e.target)) closePanel();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closePanel]);

  return (
    <div className="start-menu" ref={panelRef}>
      <div className="start-menu__section">
        <div className="start-menu__section-header">
          <span className="start-menu__section-title">Pinned</span>
          <button className="start-menu__all-apps">All apps ›</button>
        </div>
        <div className="start-menu__pinned" />
      </div>

      <div className="start-menu__section start-menu__section--recommended">
        <div className="start-menu__section-header">
          <span className="start-menu__section-title">Recommended</span>
        </div>
        <div className="start-menu__recommended" />
      </div>

      <div className="start-menu__footer">
        <button className="start-menu__user">
          <div className="start-menu__user-avatar" />
          <span className="start-menu__user-name">ISMAC</span>
        </button>
        <button className="start-menu__power" title="Apagar">
          <IoMdPower />
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
