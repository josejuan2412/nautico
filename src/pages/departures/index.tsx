import { useState } from "react";

import styles from "./Departures.module.css";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Sails, RegistrationForm } from "../../components/Sails";

export default function Departures() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen}>
      <div className={styles["view"]}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Open
          </Button>
        </SheetTrigger>
        <Sails />
      </div>
      <RegistrationForm onClose={onClose} />
    </Sheet>
  );
}
