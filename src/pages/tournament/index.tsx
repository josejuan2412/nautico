import styles from "./Tournament.module.css";
import { Leaderboard } from "../../components/leaderboards";
import NavbarElement from "../../components/design/navbar";
import Banner from "../../assets/img/banner.jpg";

export default function View() {
  return (
    <div className={styles["view"]}>
      <NavbarElement />
      <div className={styles["tournament"]}>
        <h2 className="text-center">
          <strong>Torneo de Pesca 2025</strong>
        </h2>
        <img src={Banner} alt="Torneo de Pesca" />
        <Leaderboard />
        <div>
          <p>
            <strong>Peso minimo por especie</strong>
          </p>
          <ul>
            <li>Wahoo: 25 Libras</li>
            <li>Dorado: 10 Libras</li>
            <li>Tuna: 20 Libras</li>
            <li>Kingfish: 15 Libras</li>
            <li>Barracuda: 15 Libras</li>
            <li>Jurel: 10 Libras</li>
            <li>Sabalo Real: 80 Libras</li>
            <li>Robalo: 10 Libras</li>
            <li>Bojala: 50 Libras</li>
            <li>Mero: 50 Libras</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
