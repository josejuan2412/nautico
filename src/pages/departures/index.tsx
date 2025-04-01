// import { useState } from "react";
import styles from "./Departures.module.css";

import { Sails } from "../../components/Sails";
import { DateTimePicker } from "@/components/ui/date-time-picker";

export default function Departures() {
  // const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className={styles["view"]}>
      <DateTimePicker />

      <Sails />
    </div>
  );
}
