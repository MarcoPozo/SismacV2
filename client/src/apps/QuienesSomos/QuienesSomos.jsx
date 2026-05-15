import {
  IoBulbOutline,
  IoCheckmarkCircleOutline,
  IoEyeOutline,
  IoPeopleOutline,
  IoRibbonOutline,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoStarOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import AppHeader from "../../ui/AppHeader/AppHeader";
import "./QuienesSomos.css";

const VALORES = [
  { label: "Ética", Icon: IoShieldCheckmarkOutline },
  { label: "Liderazgo", Icon: IoTrophyOutline },
  { label: "Integridad", Icon: IoCheckmarkCircleOutline },
  { label: "Calidad", Icon: IoRibbonOutline },
  { label: "Trabajo en equipo", Icon: IoPeopleOutline },
  { label: "Innovación", Icon: IoBulbOutline },
];

const QuienesSomos = () => (
  <div className="quienes-somos">
    <AppHeader title="¿Quiénes Somos?" />

    <div className="quienes-somos__body">
      <div className="quienes-somos__card quienes-somos__card--mision">
        <div className="quienes-somos__card-heading">
          <IoRocketOutline className="quienes-somos__card-icon" />
          <h2 className="quienes-somos__card-title">Misión</h2>
        </div>
        <p className="quienes-somos__card-text">
          Apoyar la formación integral a nivel técnico, tecnológico, tecnológico universitario y
          postgrados tecnológicos, formando personas que mejoren sus capacidades y potencialidades
          que sean emprendedores, competentes, comprometidos con la investigación, los valores, la
          sociedad y el cuidado del ambiente, propendiendo a la igualdad y su integración social.
        </p>
      </div>

      <div className="quienes-somos__card quienes-somos__card--vision">
        <div className="quienes-somos__card-heading">
          <IoEyeOutline className="quienes-somos__card-icon" />
          <h2 className="quienes-somos__card-title">Visión</h2>
        </div>
        <p className="quienes-somos__card-text">
          El Instituto Superior Tecnológico Universitario ISMAC, será una institución líder a nivel
          Superior Tecnológico Universitario en el Valle de Tumbaco, generadora de calidad Educativa
          para crecer, apoyar y desarrollar generaciones que mejoren su calidad de vida y
          contribuyan al crecimiento de la zona, ciudad y el país.
        </p>
      </div>

      <div className="quienes-somos__card quienes-somos__card--valores">
        <div className="quienes-somos__card-heading">
          <IoStarOutline className="quienes-somos__card-icon" />
          <h2 className="quienes-somos__card-title">Valores</h2>
        </div>
        <div className="quienes-somos__valores">
          {VALORES.map(({ label, Icon }) => (
            <div key={label} className="quienes-somos__valor">
              <Icon className="quienes-somos__valor-icon" />
              <span className="quienes-somos__valor-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default QuienesSomos;
