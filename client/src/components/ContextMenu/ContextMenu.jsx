import { useEffect, useLayoutEffect, useRef } from 'react';
import './ContextMenu.css';
import useContextMenuStore from '../../store/contextMenuStore';

const ContextMenu = () => {
  const { isOpen, position, items, close } = useContextMenuStore();
  const menuRef = useRef(null);

  useLayoutEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const el = menuRef.current;
    let { x, y } = position;
    if (x + el.offsetWidth > window.innerWidth - 4) x = x - el.offsetWidth;
    if (y + el.offsetHeight > window.innerHeight - 52) y = y - el.offsetHeight;
    el.style.left = `${Math.max(4, x)}px`;
    el.style.top = `${Math.max(4, y)}px`;
  }, [isOpen, position]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) close();
    };
    const handleEsc = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className="context-menu"
      ref={menuRef}
      style={{ left: position.x, top: position.y }}
    >
      {items.map((item, i) => {
        if (item.divider) return <div key={i} className="context-menu__divider" />;
        return (
          <button
            key={i}
            className="context-menu__item"
            onClick={() => { item.onClick?.(); close(); }}
          >
            {item.icon && <span className="context-menu__item-icon">{item.icon}</span>}
            <span className="context-menu__item-label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ContextMenu;
