import { useCallback, useEffect, useMemo, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import appsRegistry from "../../config/appsRegistry";
import useActivePanel from "../../hooks/useActivePanel";
import NotificationPanel from "../../panels/NotificationPanel/NotificationPanel";
import SearchPanel from "../../panels/SearchPanel/SearchPanel";
import StartMenu from "../../panels/StartMenu/StartMenu";
import useWindowStore from "../../store/windowStore";
import TaskbarIcon from "../../ui/TaskbarIcon/TaskbarIcon";
import "./Taskbar.css";

const BELL_ICON = <IoNotificationsOutline />;

// Static — never changes at runtime
const pinnedApps = appsRegistry.filter((a) => a.pinToTaskbar);

const Taskbar = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const { activePanel, togglePanel } = useActivePanel();
  const windows = useWindowStore((s) => s.windows);

  // O(1) lookup for open window ids
  const runningUnpinnedApps = useMemo(() => {
    const openIds = new Set(windows.map((w) => w.id));
    return appsRegistry.filter((a) => !a.pinToTaskbar && openIds.has(a.id));
  }, [windows]);

  const handleToggleStart = useCallback(() => togglePanel("start"), [togglePanel]);
  const handleToggleSearch = useCallback(() => togglePanel("search"), [togglePanel]);
  const handleToggleNotifs = useCallback(() => togglePanel("notifications"), [togglePanel]);

  useEffect(() => {
    const handleUpdateClock = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
      setDate(
        now.toLocaleDateString("es-EC", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    };
    handleUpdateClock();
    const interval = setInterval(handleUpdateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {activePanel === "start" && <StartMenu />}
      {activePanel === "search" && <SearchPanel />}
      {activePanel === "notifications" && <NotificationPanel />}

      <nav className="taskbar">
        <div className="taskbar__center">
          <TaskbarIcon
            title="Inicio"
            icon="/images/icons/icon-sismac.webp"
            onAction={handleToggleStart}
            isActive={activePanel === "start"}
            panelTrigger="start"
          />
          <TaskbarIcon
            title="Buscar"
            icon="/images/icons/icon-search.webp"
            onAction={handleToggleSearch}
            isActive={activePanel === "search"}
            panelTrigger="search"
          />

          {pinnedApps.map((app) => (
            <TaskbarIcon key={app.id} appId={app.id} title={app.title} icon={app.icon} />
          ))}
          {runningUnpinnedApps.map((app) => (
            <TaskbarIcon key={app.id} appId={app.id} title={app.title} icon={app.icon} />
          ))}
        </div>

        <div className="taskbar__tray">
          <div className="taskbar__clock">
            <span className="taskbar__clock-time">{time}</span>
            <span className="taskbar__clock-date">{date}</span>
          </div>

          <TaskbarIcon
            title="Centro de actividades"
            reactIcon={BELL_ICON}
            onAction={handleToggleNotifs}
            isActive={activePanel === "notifications"}
            panelTrigger="notifications"
          />
        </div>
      </nav>
    </>
  );
};

export default Taskbar;
