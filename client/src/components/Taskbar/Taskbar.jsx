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
          <TaskbarIcon
            title="Inicio"
            icon="/images/icons/icon-sismac.png"
            onAction={() => togglePanel('start')}
            isActive={activePanel === 'start'}
            panelTrigger="start"
          />
          <TaskbarIcon
            title="Buscar"
            icon="/images/icons/icon-search.png"
            onAction={() => togglePanel('search')}
            isActive={activePanel === 'search'}
            panelTrigger="search"
          />

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
