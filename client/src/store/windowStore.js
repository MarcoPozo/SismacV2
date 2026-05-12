import { create } from 'zustand';
import appsRegistry from '../config/appsRegistry';

let zCounter = 10;

const TASKBAR_H = 48;

const buildWindow = (appId) => {
  const app = appsRegistry.find((a) => a.id === appId);
  if (!app) return null;

  const availableW = window.innerWidth;
  const availableH = window.innerHeight - TASKBAR_H;

  const width = Math.min(app.defaultSize.width, Math.floor(availableW * 0.88));
  const height = Math.min(app.defaultSize.height, Math.floor(availableH * 0.88));

  const x = Math.max(0, (availableW - width) / 2);
  const y = Math.max(0, (availableH - height) / 2);

  return {
    id: appId,
    isMinimized: false,
    isMinimizing: false,
    isMaximized: false,
    wasMaximized: false,
    isDragging: false,
    isSnapped: false,
    snapType: null,
    sizeBeforeSnap: null,
    isFocused: true,
    position: { x, y },
    size: { width, height },
    zIndex: ++zCounter,
    isClosing: false,
  };
};

const getSnapRect = (type) => {
  const w = window.innerWidth;
  const h = window.innerHeight - TASKBAR_H;
  if (type === 'top')   return { x: 0,     y: 0, width: w,     height: h };
  if (type === 'left')  return { x: 0,     y: 0, width: w / 2, height: h };
  if (type === 'right') return { x: w / 2, y: 0, width: w / 2, height: h };
  return null;
};

const useWindowStore = create((set, get) => ({
  windows: [],
  snapPreview: null,

  openWindow: (appId) => {
    const existing = get().windows.find((w) => w.id === appId);
    if (existing) {
      set((state) => ({
        windows: state.windows.map((w) => ({
          ...w,
          isFocused: w.id === appId,
          isMinimized: w.id === appId ? false : w.isMinimized,
          isMinimizing: w.id === appId ? false : w.isMinimizing,
          isMaximized: w.id === appId ? (w.isMinimized ? w.wasMaximized : w.isMaximized) : w.isMaximized,
          wasMaximized: w.id === appId ? false : w.wasMaximized,
          zIndex: w.id === appId ? ++zCounter : w.zIndex,
        })),
      }));
      return;
    }
    const win = buildWindow(appId);
    if (!win) return;
    set((state) => ({
      windows: [
        ...state.windows.map((w) => ({ ...w, isFocused: false })),
        win,
      ],
    }));
  },

  closeWindow: (appId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId ? { ...w, isClosing: true, isFocused: false } : w
      ),
    }));
  },

  destroyWindow: (appId) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== appId),
    }));
  },

  minimizeWindow: (appId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId
          ? { ...w, isMinimizing: true, wasMaximized: w.isMaximized, isMaximized: false, isFocused: false }
          : w
      ),
    }));
  },

  finishMinimize: (appId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId ? { ...w, isMinimized: true, isMinimizing: false } : w
      ),
    }));
  },

  maximizeWindow: (appId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  focusWindow: (appId) => {
    set((state) => ({
      windows: state.windows.map((w) => ({
        ...w,
        isFocused: w.id === appId,
        isMinimized: w.id === appId ? false : w.isMinimized,
        isMinimizing: w.id === appId ? false : w.isMinimizing,
        isMaximized: w.id === appId ? (w.isMinimized ? w.wasMaximized : w.isMaximized) : w.isMaximized,
        wasMaximized: w.id === appId ? false : w.wasMaximized,
        zIndex: w.id === appId ? ++zCounter : w.zIndex,
      })),
    }));
  },

  moveWindow: (appId, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId ? { ...w, position } : w
      ),
    }));
  },

  setSnapPreview: (type) => set({ snapPreview: { type, rect: getSnapRect(type) } }),
  clearSnapPreview: () => set({ snapPreview: null }),

  snapWindow: (appId, type) => {
    if (type === 'top') {
      set((state) => ({
        windows: state.windows.map((w) =>
          w.id === appId ? { ...w, isMaximized: true, isSnapped: false } : w
        ),
      }));
      return;
    }
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId
          ? {
              ...w,
              isSnapped: true,
              snapType: type,
              sizeBeforeSnap: w.isSnapped ? w.sizeBeforeSnap : { ...w.size },
            }
          : w
      ),
    }));
  },

  setWindowDragging: (appId, val) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId ? { ...w, isDragging: val } : w
      ),
    }));
  },

  unsnap: (appId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId
          ? { ...w, isSnapped: false, snapType: null, size: w.sizeBeforeSnap ?? w.size, sizeBeforeSnap: null }
          : w
      ),
    }));
  },
}));

export default useWindowStore;
