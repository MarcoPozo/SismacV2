import { useEffect } from "react";
import { IoLocationOutline, IoOpenOutline, IoStarSharp } from "react-icons/io5";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from "react-leaflet";
import useSettingsStore from "../../store/settingsStore";
import AppHeader from "../../ui/AppHeader/AppHeader";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./UbicacionIsmac.css";

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
};

const CAMPUS_12_COORDS = [-0.2163012, -78.4018154];
const CAMPUS_3_COORDS = [-0.2155445, -78.4012108];
const MAP_CENTER = [
  (CAMPUS_12_COORDS[0] + CAMPUS_3_COORDS[0]) / 2,
  (CAMPUS_12_COORDS[1] + CAMPUS_3_COORDS[1]) / 2,
];

const makePinIcon = (label) =>
  L.divIcon({
    className: "",
    html: `
      <div class="ubicacion-ismac__marker-wrap">
        <span class="ubicacion-ismac__marker-label">${label}</span>
        <div class="ubicacion-ismac__marker-dot"></div>
      </div>
    `,
    iconSize: [110, 52],
    iconAnchor: [55, 52],
    popupAnchor: [0, -54],
  });

const campus12Icon = makePinIcon("Campus 1 y 2");
const campus3Icon = makePinIcon("Campus 3");

const TILE_DARK = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_LIGHT = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

const UbicacionIsmac = () => {
  const baseMode = useSettingsStore((s) => s.baseMode);
  const tileUrl = baseMode === "light" ? TILE_LIGHT : TILE_DARK;

  return (
    <div className="ubicacion-ismac">
      <AppHeader title="Ubicación" />

      <div className="ubicacion-ismac__map-wrap">
        <MapContainer
          center={MAP_CENTER}
          zoom={16}
          className="ubicacion-ismac__map"
          zoomControl={false}
          scrollWheelZoom
        >
          <TileLayer
            key={tileUrl}
            url={tileUrl}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains="abcd"
            maxZoom={20}
          />
          <MapResizer />
          <ZoomControl position="bottomright" />

          <Marker position={CAMPUS_12_COORDS} icon={campus12Icon}>
            <Popup>
              <strong>Campus 1 y 2 — ISMAC</strong>
              <br />
              Belermo y Av. Oswaldo Guayasamín S2-02 Y, Quito
            </Popup>
          </Marker>

          <Marker position={CAMPUS_3_COORDS} icon={campus3Icon}>
            <Popup>
              <strong>Campus 3 — ISMAC</strong>
              <br />
              Sector La Morita, Quito
            </Popup>
          </Marker>
        </MapContainer>

        <div className="ubicacion-ismac__card">
          <p className="ubicacion-ismac__card-name">Instituto Tecnológico Universitario ISMAC</p>

          <div className="ubicacion-ismac__card-row">
            <IoLocationOutline className="ubicacion-ismac__card-icon" />
            <div className="ubicacion-ismac__card-addresses">
              <span className="ubicacion-ismac__card-campus">Campus 1 y 2</span>
              <span>Belermo y Av. Oswaldo Guayasamín S2-02 Y, Quito</span>
              <span className="ubicacion-ismac__card-campus">Campus 3</span>
              <span>Sector La Morita, Quito</span>
            </div>
          </div>

          <div className="ubicacion-ismac__card-row">
            <IoStarSharp className="ubicacion-ismac__card-icon ubicacion-ismac__card-icon--star" />
            <span>4.5 · 107 reseñas en Google</span>
          </div>

          <div className="ubicacion-ismac__card-links">
            <a
              className="ubicacion-ismac__card-link"
              href="https://maps.app.goo.gl/Nr2zKarLMFDkJL1N7"
              target="_blank"
              rel="noreferrer"
            >
              <IoOpenOutline />
              Campus 1 y 2
            </a>
            <a
              className="ubicacion-ismac__card-link"
              href="https://maps.app.goo.gl/sUfPxu5C68jUnvw97"
              target="_blank"
              rel="noreferrer"
            >
              <IoOpenOutline />
              Campus 3
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UbicacionIsmac;
