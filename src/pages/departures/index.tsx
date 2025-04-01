import styles from "./Departures.module.css";

import { Sails, DatePickerDemo } from "../../components/Sails";

export default function Departures() {
  return (
    <div className={styles["view"]}>
      <DatePickerDemo />
      <Sails />
    </div>
  );
}
