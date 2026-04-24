# SismacV2

Portal institucional de ISMAC con estética de sistema operativo (Windows 11), construido con React 19 + Vite.

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + Vite 8 |
| Estado | Zustand |
| Routing | React Router v6 |
| Estilos | CSS plano con variables y metodología BEM |
| Backend | Express (pendiente) |

## Estructura

```
SismacV2/
├── client/          # React app
│   ├── public/      # Assets estáticos (imágenes, íconos, wallpapers)
│   └── src/
│       ├── components/  # Componentes del OS shell
│       ├── config/      # appsRegistry — catálogo de apps
│       ├── hooks/       # useDrag
│       ├── pages/       # Contenido de cada ventana
│       ├── store/       # windowStore, panelStore (Zustand)
│       └── styles/      # variables.css, globals.css, animations.css
└── server/          # Express API (pendiente)
```

## Correr en desarrollo

```bash
cd client
npm install
npm run dev
```
