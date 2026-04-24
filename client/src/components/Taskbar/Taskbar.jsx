import { useState, useEffect } from 'react';
import './Taskbar.css';
import TaskbarIcon from '../TaskbarIcon/TaskbarIcon';
import StartMenu from '../StartMenu/StartMenu';
import SearchPanel from '../SearchPanel/SearchPanel';
import appsRegistry from '../../config/appsRegistry';
import usePanelStore from '../../store/panelStore';

const Taskbar = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const activePanel = usePanelStore((s) => s.activePanel);
  const togglePanel = usePanelStore((s) => s.togglePanel);

  const pinnedApps = appsRegistry.filter((a) => a.pinToTaskbar);

  useEffect(() => {
    const handleUpdateClock = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
      setDate(
        now.toLocaleDateString('es-EC', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      );
    };
    handleUpdateClock();
    const interval = setInterval(handleUpdateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {activePanel === 'start' && <StartMenu />}
      {activePanel === 'search' && <SearchPanel />}

      <nav className="taskbar">
        <div className="taskbar__center">
          <button
            className={`taskbar__start${activePanel === 'start' ? ' taskbar__start--active' : ''}`}
            title="Inicio"
            data-panel-trigger="start"
            onClick={() => togglePanel('start')}
          >
            <img
              className="taskbar__start-logo"
              src="/images/icons/icon-sismac.png"
              alt="Sismac"
              draggable={false}
            />
          </button>

          <button
            className={`taskbar__search${activePanel === 'search' ? ' taskbar__search--active' : ''}`}
            title="Buscar"
            data-panel-trigger="search"
            onClick={() => togglePanel('search')}
          >
            <img
              className="taskbar__search-icon"
              src="/images/icons/icon-search.png"
              alt="Buscar"
              draggable={false}
            />
          </button>

          {pinnedApps.map((app) => (
            <TaskbarIcon
              key={app.id}
              appId={app.id}
              title={app.title}
              icon={app.icon}
            />
          ))}
        </div>

        <div className="taskbar__tray">
          <div className="taskbar__clock">
            <span className="taskbar__clock-time">{time}</span>
            <span className="taskbar__clock-date">{date}</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Taskbar;
