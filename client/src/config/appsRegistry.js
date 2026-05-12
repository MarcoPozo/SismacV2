import { lazy } from "react";

const appsRegistry = [
  {
    id: "settings",
    title: "Configuración",
    icon: "/images/icons/icon-settings.png",
    route: "/configuracion",
    component: lazy(() => import("../apps/Settings/Settings.jsx")),
    defaultSize: { width: 860, height: 560 },
    showOnDesktop: true,
    pinToTaskbar: true,
    pinToStartMenu: true,
  },
  {
    id: "explorer",
    title: "Explorador",
    icon: "/images/icons/icon-explorer.png",
    route: "/explorador",
    component: lazy(() => import("../apps/Explorer/Explorer.jsx")),
    defaultSize: { width: 860, height: 560 },
    showOnDesktop: true,
    pinToTaskbar: false,
    pinToStartMenu: true,
  },
  {
    id: "calendar",
    title: "Calendario",
    icon: "/images/icons/icon-calendar.png",
    route: "/calendario",
    component: lazy(() => import("../apps/Calendar/Calendar.jsx")),
    defaultSize: { width: 860, height: 560 },
    showOnDesktop: true,
    pinToTaskbar: false,
    pinToStartMenu: true,
  },
  {
    id: "photos",
    title: "Fotos",
    icon: "/images/icons/icon-photos.png",
    route: "/fotos",
    component: lazy(() => import("../apps/Photos/Photos.jsx")),
    defaultSize: { width: 860, height: 560 },
    showOnDesktop: true,
    pinToTaskbar: false,
    pinToStartMenu: true,
  },
];

export default appsRegistry;
