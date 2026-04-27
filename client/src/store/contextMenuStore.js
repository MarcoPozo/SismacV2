import { create } from 'zustand';

const STORAGE_KEY = 'sm_context_menu_enabled';

const useContextMenuStore = create((set) => ({
  isOpen: false,
  isEnabled: localStorage.getItem(STORAGE_KEY) !== 'false',
  position: { x: 0, y: 0 },
  items: [],
  open: (position, items) => set({ isOpen: true, position, items }),
  close: () => set({ isOpen: false, items: [] }),
  toggleEnabled: () =>
    set((s) => {
      const next = !s.isEnabled;
      localStorage.setItem(STORAGE_KEY, String(next));
      return { isEnabled: next, isOpen: false };
    }),
}));

export default useContextMenuStore;
