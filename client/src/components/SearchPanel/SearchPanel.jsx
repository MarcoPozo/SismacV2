import { useEffect, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import './SearchPanel.css';
import usePanelStore from '../../store/panelStore';

const TABS = ['All', 'Apps', 'Documents', 'Web', 'More'];

const SearchPanel = () => {
  const closePanel = usePanelStore((s) => s.closePanel);
  const panelRef = useRef(null);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const handleOutside = (e) => {
      if (e.target.closest('[data-panel-trigger]')) return;
      if (!panelRef.current?.contains(e.target)) closePanel();
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
  }, [closePanel]);

  return (
    <div className="search-panel" ref={panelRef}>
      <div className="search-panel__bar">
        <IoSearchOutline className="search-panel__bar-icon" />
        <input
          className="search-panel__input"
          type="text"
          placeholder="Type here to search"
          autoFocus
        />
      </div>

      <div className="search-panel__tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`search-panel__tab${activeTab === tab ? ' search-panel__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="search-panel__section">
        <span className="search-panel__section-title">Top apps</span>
        <div className="search-panel__apps" />
      </div>

      <div className="search-panel__section">
        <span className="search-panel__section-title">Quick Searches</span>
        <div className="search-panel__quick" />
      </div>
    </div>
  );
};

export default SearchPanel;
