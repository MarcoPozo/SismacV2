import './DesktopIcon.css';

const DesktopIcon = ({ id, title, icon, onOpen, onContextMenu }) => {
  return (
    <button
      className="desktop-icon"
      onClick={() => onOpen(id)}
      onContextMenu={(e) => onContextMenu?.(e, id)}
      title={title}
    >
      <div className="desktop-icon__img-wrap">
        <img className="desktop-icon__img" src={icon} alt={title} draggable={false} />
      </div>
      <span className="desktop-icon__label">{title}</span>
    </button>
  );
};

export default DesktopIcon;
