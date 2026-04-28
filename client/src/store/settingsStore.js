import { create } from 'zustand';
import { CAREERS } from '../config/careersRegistry';

export { CAREERS };

const WALLPAPER_KEY   = 'sm_wallpaper';
const ACCENT_KEY      = 'sm_accent';
const BASEMODE_KEY    = 'sm_basemode';
const CAREERTHEME_KEY = 'sm_career_theme';

const DEFAULT_WALLPAPER = '/images/wallpapers/bg-1.jpg';
const DEFAULT_ACCENT    = '#dc1f26';
const DEFAULT_BASEMODE  = 'dark';

const TEXT_DARK  = '#f0f0f5';
const TEXT_LIGHT = '#1a1b22';

// Luminancia relativa WCAG 2.1 determina si el texto encima debe ser claro u oscuro
const getContrastText = (colorStr) => {
  let r, g, b;
  if (colorStr.startsWith('#')) {
    r = parseInt(colorStr.slice(1, 3), 16);
    g = parseInt(colorStr.slice(3, 5), 16);
    b = parseInt(colorStr.slice(5, 7), 16);
  } else {
    const m = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return TEXT_DARK;
    [, r, g, b] = m.map(Number);
  }
  const lin = (v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return L > 0.35 ? TEXT_LIGHT : TEXT_DARK;
};

const applyAccent = (hex) => {
  const root = document.documentElement;
  root.style.setProperty('--sm-brand', hex);
  root.style.setProperty('--sm-brand-bg', `${hex}1f`);
  root.style.setProperty('--sm-brand-border', `${hex}4d`);
};

const applyBaseMode = (mode) => {
  if (mode === 'light') document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
};

const applyCareerTheme = (id) => {
  const career = CAREERS.find((c) => c.id === id);
  if (!career) return;
  const root = document.documentElement;
  root.style.setProperty('--sm-window-titlebar', career.titlebar);
  root.style.setProperty('--sm-window-border', career.border);
  root.style.setProperty('--sm-window-titlebar-text', getContrastText(career.titlebar));
};

const clearCareerTheme = () => {
  const root = document.documentElement;
  root.style.removeProperty('--sm-window-titlebar');
  root.style.removeProperty('--sm-window-border');
  root.style.removeProperty('--sm-window-titlebar-text');
};

const storedWallpaper   = localStorage.getItem(WALLPAPER_KEY)   ?? DEFAULT_WALLPAPER;
const storedAccent      = localStorage.getItem(ACCENT_KEY)      ?? DEFAULT_ACCENT;
const storedBaseMode    = localStorage.getItem(BASEMODE_KEY)    ?? DEFAULT_BASEMODE;
const storedCareerTheme = localStorage.getItem(CAREERTHEME_KEY) || null;

applyBaseMode(storedBaseMode);
if (storedCareerTheme) applyCareerTheme(storedCareerTheme);
applyAccent(storedAccent);

const useSettingsStore = create((set, get) => ({
  wallpaper:   storedWallpaper,
  accentColor: storedAccent,
  baseMode:    storedBaseMode,
  careerTheme: storedCareerTheme,

  setWallpaper: (path) => {
    localStorage.setItem(WALLPAPER_KEY, path);
    set({ wallpaper: path });
  },

  setAccentColor: (hex) => {
    localStorage.setItem(ACCENT_KEY, hex);
    applyAccent(hex);
    set({ accentColor: hex });
  },

  setBaseMode: (mode) => {
    localStorage.setItem(BASEMODE_KEY, mode);
    applyBaseMode(mode);
    const { careerTheme } = get();
    if (careerTheme) applyCareerTheme(careerTheme);
    set({ baseMode: mode });
  },

  setCareerTheme: (id) => {
    localStorage.setItem(CAREERTHEME_KEY, id ?? '');
    if (id) {
      applyCareerTheme(id);
    } else {
      clearCareerTheme();
    }
    set({ careerTheme: id });
  },
}));

export default useSettingsStore;
