import { FormEvent, useState } from "react";
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

import { DateTime } from "luxon";

export default function Departures() {
  // const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <Sheet>
      <div className={styles["view"]}>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <Sails />
      </div>
      <RegistrationForm />
    </Sheet>
  );
}

function RegistrationForm() {
  const defaultDeparture = DateTime.now().toJSDate();
  const defaultArrival = DateTime.now().plus({ hours: 4 }).toJSDate();

  const [boat, setBoat] = useState("");
  const [departure, setDeparture] = useState<Date | undefined>(
    defaultDeparture,
  );
  const [arrival, setArrival] = useState<Date | undefined>(defaultArrival);

  const isValid: boolean = !!(boat && departure && arrival);

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
          <div className="grid grid-cols-4 items-center gap-10">
            <Label htmlFor="name" className="text-left">
              Embarcación
            </Label>
            <Input
              required
              id="boat"
              value={boat}
              onChange={(e) => {
                setBoat(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-10">
            <Label htmlFor="username" className="text-left">
              Capitán
            </Label>
            <Input
              required
              id="username"
              value="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-10">
            <Label htmlFor="username" className="text-left">
              Tripulación
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-10">
            <Label htmlFor="username" className="text-left">
              Destino
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-10">
            <Label htmlFor="username" className="text-left">
              Salida
            </Label>
            <DateTimePicker date={departure} setDate={setDeparture} />
          </div>
          <div className="grid grid-cols-4 items-center gap-10">
            <Label htmlFor="username" className="text-left">
              Entrada
            </Label>
            <DateTimePicker date={arrival} setDate={setArrival} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button disabled={!isValid} type="submit">
              Enviar
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </SheetContent>
  );
}
