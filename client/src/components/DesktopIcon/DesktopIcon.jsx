import './DesktopIcon.css';

const DesktopIcon = ({ id, title, icon, onOpen }) => {
  const handleClick = () => {
    onOpen(id);
  };

  return (
    <button className="desktop-icon" onClick={handleClick} title={title}>
      <div className="desktop-icon__img-wrap">
        <img className="desktop-icon__img" src={icon} alt={title} draggable={false} />
      </div>
      <span className="desktop-icon__label">{title}</span>
    </button>
  );
};

export default DesktopIcon;
