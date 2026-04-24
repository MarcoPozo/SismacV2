import { useRef, useCallback } from 'react';
import useWindowStore from '../store/windowStore';

const TITLE_VISIBLE_LEFT = 200;
const TITLE_VISIBLE_RIGHT = 120;
const TASKBAR_H = 48;
const TITLEBAR_H = 32;

const useDrag = (appId) => {
  const moveWindow = useWindowStore((s) => s.moveWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow);
  const isDragging = useRef(false);
  const startMouse = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const pendingUnmaximize = useRef(null);

  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      e.preventDefault();

      const win = useWindowStore.getState().windows.find((w) => w.id === appId);
      if (!win) return;

      focusWindow(appId);

      if (win.isMaximized) {
        // Guardar la intención: solo unmaximizar si hay movimiento real
        pendingUnmaximize.current = { ratio: e.clientX / window.innerWidth };
        isDragging.current = true;
        startMouse.current = { x: e.clientX, y: e.clientY };
      } else {
        isDragging.current = true;
        startMouse.current = { x: e.clientX, y: e.clientY };
        startPos.current = { x: win.position.x, y: win.position.y };
      }

      document.querySelectorAll('iframe').forEach((f) => {
        f.style.pointerEvents = 'none';
      });

      const handleMouseMove = (ev) => {
        if (!isDragging.current) return;

        if (pendingUnmaximize.current) {
          const { ratio } = pendingUnmaximize.current;
          const currentWin = useWindowStore.getState().windows.find((w) => w.id === appId);
          if (!currentWin) return;
          const newX = ev.clientX - ratio * currentWin.size.width;
          const newY = 0;
          maximizeWindow(appId);
          moveWindow(appId, { x: newX, y: newY });
          startPos.current = { x: newX, y: newY };
          startMouse.current = { x: ev.clientX, y: ev.clientY };
          pendingUnmaximize.current = null;
          return;
        }

        const dx = ev.clientX - startMouse.current.x;
        const dy = ev.clientY - startMouse.current.y;

        const winEl = document.getElementById(`window-${appId}`);
        const winW = winEl ? winEl.offsetWidth : 800;

        const newX = Math.max(
          -(winW - TITLE_VISIBLE_LEFT),
          Math.min(window.innerWidth - TITLE_VISIBLE_RIGHT, startPos.current.x + dx)
        );
        const newY = Math.max(
          0,
          Math.min(
            window.innerHeight - TASKBAR_H - TITLEBAR_H,
            startPos.current.y + dy
          )
        );

        moveWindow(appId, { x: newX, y: newY });
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        pendingUnmaximize.current = null;
        document.querySelectorAll('iframe').forEach((f) => {
          f.style.pointerEvents = 'auto';
        });
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [appId, focusWindow, moveWindow, maximizeWindow]
  );

  return { handleMouseDown };
};

export default useDrag;
