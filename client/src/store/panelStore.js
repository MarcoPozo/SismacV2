import { create } from 'zustand';

const usePanelStore = create((set) => ({
  activePanel: null,
  togglePanel: (id) => set((s) => ({ activePanel: s.activePanel === id ? null : id })),
  closePanel: () => set({ activePanel: null }),
}));

export default usePanelStore;
