import { lazy } from "react";

const appsRegistry = [
  {
    id: "settings",
    title: "Configuración",
    icon: "/images/icons/icon-settings.png",
    route: "/configuracion",
    component: lazy(() => import("../apps/Settings/Settings.jsx")),
    defaultSize: { width: 800, height: 520 },
    showOnDesktop: true,
    pinToTaskbar: true,
    pinToStartMenu: true,
  },
];

export default appsRegistry;
