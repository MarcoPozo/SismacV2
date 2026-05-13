import useSettingsStore from '../store/settingsStore';

const useAppSettings = () => {
  const wallpaper      = useSettingsStore((s) => s.wallpaper);
  const accentColor    = useSettingsStore((s) => s.accentColor);
  const baseMode       = useSettingsStore((s) => s.baseMode);
  const careerTheme    = useSettingsStore((s) => s.careerTheme);
  const setWallpaper   = useSettingsStore((s) => s.setWallpaper);
  const setAccentColor = useSettingsStore((s) => s.setAccentColor);
  const setBaseMode    = useSettingsStore((s) => s.setBaseMode);
  const setCareerTheme = useSettingsStore((s) => s.setCareerTheme);

  return {
    wallpaper,
    accentColor,
    baseMode,
    careerTheme,
    setWallpaper,
    setAccentColor,
    setBaseMode,
    setCareerTheme,
  };
};

export default useAppSettings;
