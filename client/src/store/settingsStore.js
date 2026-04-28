import { create } from 'zustand';

const WALLPAPER_KEY = 'sm_wallpaper';
const ACCENT_KEY = 'sm_accent';
const DEFAULT_WALLPAPER = '/images/wallpapers/bg-1.jpg';
const DEFAULT_ACCENT = '#dc1f26';

export const ACCENT_PRESETS = [
  { label: 'Rojo',    value: '#dc1f26' },
  { label: 'Azul',   value: '#0078d4' },
  { label: 'Índigo', value: '#4f46e5' },
  { label: 'Verde',  value: '#16a34a' },
  { label: 'Naranja',value: '#ea580c' },
  { label: 'Rosa',   value: '#db2777' },
  { label: 'Cian',   value: '#0891b2' },
];

const applyAccent = (hex) => {
  const root = document.documentElement;
  root.style.setProperty('--sm-brand', hex);
  root.style.setProperty('--sm-brand-bg', `${hex}1f`);
  root.style.setProperty('--sm-brand-border', `${hex}4d`);
};

const storedWallpaper = localStorage.getItem(WALLPAPER_KEY) ?? DEFAULT_WALLPAPER;
const storedAccent = localStorage.getItem(ACCENT_KEY) ?? DEFAULT_ACCENT;

// Restaura el acento guardado al cargar
applyAccent(storedAccent);

const useSettingsStore = create((set) => ({
  wallpaper: storedWallpaper,
  accentColor: storedAccent,
  accentPresets: ACCENT_PRESETS,

  setWallpaper: (path) => {
    localStorage.setItem(WALLPAPER_KEY, path);
    set({ wallpaper: path });
  },

  setAccentColor: (hex) => {
    localStorage.setItem(ACCENT_KEY, hex);
    applyAccent(hex);
    set({ accentColor: hex });
  },
}));

export default useSettingsStore;
