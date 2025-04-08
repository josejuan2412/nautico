import styles from "./Tournament.module.css";

import { Leaderboard } from "../../components/leaderboard";

export default function View() {
  return (
    <div className={styles["view"]}>
      <Leaderboard />
    </div>
  );
}
