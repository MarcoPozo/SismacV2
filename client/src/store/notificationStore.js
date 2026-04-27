import { create } from 'zustand';

let toastId = 0;

const useNotificationStore = create((set, get) => ({
  toasts: [],

  push: ({ type = 'info', title, message, duration = 4000 }) => {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts.slice(-2), { id, type, title, message, isDismissing: false }] }));
    setTimeout(() => get().dismiss(id), duration);
  },

  dismiss: (id) => {
    set((s) => ({
      toasts: s.toasts.map((t) => (t.id === id ? { ...t, isDismissing: true } : t)),
    }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 280);
  },
}));

export default useNotificationStore;
