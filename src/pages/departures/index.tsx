import { useState } from "react";
import styles from "./Departures.module.css";

import { Sails } from "../../components/Sails";
import { DateTimePicker } from "@/components/ui/datetime-picker";

export default function Departures() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className={styles["view"]}>
      <div style={{ width: 400 }}>
        <DateTimePicker hourCycle={12} value={date} onChange={setDate} />
      </div>

      <Sails />
    </div>
  );
}
