import DesktopIcon from '../DesktopIcon/DesktopIcon';

const DesktopIconGrid = ({ apps, onOpen, onContextMenu }) => (
  <div className="desktop__icons">
    {apps.map((app) => (
      <DesktopIcon
        key={app.id}
        id={app.id}
        title={app.title}
        icon={app.icon}
        onOpen={onOpen}
        onContextMenu={onContextMenu}
      />
    ))}
  </div>
);

export default DesktopIconGrid;
