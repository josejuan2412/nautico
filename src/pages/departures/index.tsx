// import { useState } from "react";
import styles from "./Departures.module.css";

import { Sails } from "../../components/Sails";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormEvent } from "react";

export default function Departures() {
  // const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className={styles["view"]}>
          <Button variant="outline">Open</Button>
          <DateTimePicker />
          <Sails />
        </div>
      </SheetTrigger>
      <RegistrationForm />
    </Sheet>
  );
}

function RegistrationForm() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`I send data`);
  };
  return (
    <SheetContent>
      <form onSubmit={onSubmit}>
        <SheetHeader>
          <SheetTitle>Registrar Viaje</SheetTitle>
          <SheetDescription>
            Llene el formulario para llenar el viaje
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </SheetContent>
  );
}
