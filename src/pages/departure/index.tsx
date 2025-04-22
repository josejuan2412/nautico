import { useState } from "react";

import styles from "./Departures.module.css";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Sails, RegistrationForm } from "../../components/sail";

import NavbarElement from "../../components/design/navbar";

export default function Departures() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles["view"]}>
      <Sheet open={isOpen}>
        <div className={styles["max-height"]}>
          <NavbarElement />
          <div className={styles["sails"]}>
            <div className="content-center">
              {" "}
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Registrar Salida +
                </Button>
              </SheetTrigger>
            </div>
            <div className={styles["sails-heading"]}>
              <h3>
                <strong>Salidas Recientes</strong>
              </h3>
            </div>
            <div>
              <Sails />
            </div>
          </div>
        </div>

        <RegistrationForm onClose={onClose} />
      </Sheet>
    </div>
  );
}
