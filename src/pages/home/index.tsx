import { RegistrationForm } from "../../components/tournament";
import styles from "./Home.module.css";
export default function View() {
  return (
    <div>
      Home
      <div className={styles["registration-form"]}>
        <RegistrationForm tournamentId={1} />
      </div>
    </div>
  );
}
