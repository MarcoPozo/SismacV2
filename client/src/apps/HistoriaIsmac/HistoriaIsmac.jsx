import { IoBookOutline } from "react-icons/io5";
import AppHeader from "../../ui/AppHeader/AppHeader";
import "./HistoriaIsmac.css";

const HistoriaIsmac = () => (
  <div className="historia-ismac">
    <AppHeader title="Nuestra Historia" />

    <div className="historia-ismac__body">
      <div className="historia-ismac__video-col">
        <div className="historia-ismac__video-wrap">
          <iframe
            className="historia-ismac__iframe"
            src="https://player.vimeo.com/video/1093777536?badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Historia ISMAC"
          />
        </div>
      </div>

      <div className="historia-ismac__text-col">
        <div className="historia-ismac__section-heading">
          <IoBookOutline className="historia-ismac__section-icon" />
          <h2 className="historia-ismac__section-title">Nuestra Historia</h2>
        </div>

        <p className="historia-ismac__paragraph">
          Desde hace más de 24 años, el Instituto Superior Tecnológico Universitario ISMAC ha
          forjado su identidad en el Valle de Tumbaco como referente de educación técnica y
          tecnológica de calidad. A lo largo de este recorrido, hemos acompañado a más de{" "}
          <strong>3.000 graduados</strong> — los camaleones ISMAC — quienes transformaron sus vidas
          adquiriendo conocimiento de forma eficiente, práctica y significativa.
        </p>

        <p className="historia-ismac__paragraph">
          Nuestro compromiso trasciende las aulas: con más de{" "}
          <strong>500 proyectos de vinculación comunitaria</strong>, hemos contribuido activamente
          al desarrollo de la región y sus comunidades aledañas. Cada proyecto, cada graduado, cada
          logro compartido reafirma nuestra misión: formar personas que dejan huella y transforman
          su entorno con conocimiento.
        </p>

        <p className="historia-ismac__tagline">ISMAC — Cambiamos tu ADN con conocimiento.</p>
      </div>
    </div>
  </div>
);

export default HistoriaIsmac;
