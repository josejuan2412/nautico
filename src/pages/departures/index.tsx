import styles from "./Departures.module.css";

import { Sails } from "../../components/Sails";
import { DatePicker } from "@/components/ui/date-picker";

export default function Departures() {
  return (
    <div className={styles["view"]}>
      <DatePicker />
      <Sails />
    </div>
  );
}
