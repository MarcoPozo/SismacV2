import { IoConstructOutline } from "react-icons/io5";
import "./AppComingSoon.css";

const AppComingSoon = ({ title }) => (
  <div className="app-coming-soon">
    <IoConstructOutline className="app-coming-soon__icon" />
    <p className="app-coming-soon__title">{title}</p>
    <p className="app-coming-soon__sub">Contenido en construcción</p>
  </div>
);

export default AppComingSoon;
