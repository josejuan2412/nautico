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
    <div>
      <Sheet open={isOpen}>
        <NavbarElement />
        <div className={styles["view"]}>
          <div className="page-header section-dark text-center">
            <div className={styles["btn-bottom"]}>
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
            <div className={styles["sails-table"]}>
              {" "}
              <Sails />
            </div>
          </div>
        </div>
        <RegistrationForm onClose={onClose} />
      </Sheet>
    </div>
  );
}
