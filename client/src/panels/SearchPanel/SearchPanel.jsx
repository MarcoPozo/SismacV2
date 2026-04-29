import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import './SearchPanel.css';
import appsRegistry from '../../config/appsRegistry';
import usePanelStore from '../../store/panelStore';
import useWindowStore from '../../store/windowStore';
import usePanelClose from '../../hooks/usePanelClose';

const SearchPanel = () => {
  const closePanel = usePanelStore((s) => s.closePanel);
  const openWindow = useWindowStore((s) => s.openWindow);
  const panelRef = usePanelClose(closePanel);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = query.trim()
    ? appsRegistry.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
    : appsRegistry;

  const handleOpen = (appId) => {
    openWindow(appId);
    closePanel();
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleOpen(results[selectedIndex].id);
    }
  };

  const sectionTitle = query.trim() ? 'Resultados' : 'Aplicaciones';

  return (
    <div className="search-panel" ref={panelRef}>
      <div className="search-panel__bar">
        <IoSearchOutline className="search-panel__bar-icon" />
        <input
          className="search-panel__input"
          type="text"
          placeholder="Buscar aplicaciones..."
          autoFocus
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="search-panel__results">
        {results.length > 0 ? (
          <>
            <span className="search-panel__results-title">{sectionTitle}</span>
            {results.map((app, i) => (
              <button
                key={app.id}
                className={`search-panel__result${i === selectedIndex ? ' search-panel__result--selected' : ''}`}
                onClick={() => handleOpen(app.id)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <img
                  className="search-panel__result-icon"
                  src={app.icon}
                  alt={app.title}
                  draggable={false}
                />
                <span className="search-panel__result-label">{app.title}</span>
              </button>
            ))}
          </>
        ) : (
          <p className="search-panel__empty">Sin resultados para &ldquo;{query}&rdquo;</p>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;
