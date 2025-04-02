import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";

import { X } from "lucide-react";

import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const RegistrationFormSchema = z
  .object({
    boat: z.string().min(2, {
      message: "El nombre del bote debe ser por lo menos 2 caracteres",
    }),
    captain: z.string().min(2, {
      message: "El nombre del capitan tiene que ser por lo menos 2 caracteres",
    }),
    crew: z.number().min(1, {
      message: "La cantidad de la tripulacion tiene que ser al menos 1 persona",
    }),
    destination: z.string().min(2, {
      message: "El nombre del destino tiene que ser por lo menos 2 caracteres",
    }),
    departure: z
      .date({
        required_error: "Fecha de salida es requerida",
      })
      .refine(
        (data) => {
          const selectedDate = data;
          const minValidDate = DateTime.now().minus({ minutes: 30 }).toJSDate();
          return selectedDate > minValidDate;
        },
        {
          message: "La hora de salida no puede ser en el pasado",
        },
      ),
    arrival: z.date({
      required_error: "Fecha de entrada es requerida",
    }),
  })
  .refine((data) => data.arrival >= data.departure, {
    message: "La hora de entrada tiene que ser mayor que la hora de salida",
    path: ["arrival"],
  });

export function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RegistrationFormSchema>>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      boat: "",
      captain: "",
      crew: 1,
      destination: "",
      departure: DateTime.now().toJSDate(),
      arrival: DateTime.now().plus({ hours: 4 }).toJSDate(),
    },
  });

  const onSubmit = (values: z.infer<typeof RegistrationFormSchema>) => {
    setIsLoading(true);
    console.log(values);
    setTimeout(() => {
      setIsLoading(false);
      form.reset();
      onClose();
    }, 3000);
  };

  return (
    <SheetContent>
      <SheetClose
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetClose>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>Registrar Viaje</SheetTitle>
            <SheetDescription>
              Llene el formulario para llenar el viaje
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-10">
              <FormField
                control={form.control}
                name="boat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Embarcación</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Nombre del bote</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-10">
              <FormField
                control={form.control}
                name="captain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capitán</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Nombre del capitán</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-10">
              <FormField
                control={form.control}
                name="crew"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tripulación</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(`${e.target.value}`))
                        }
                      />
                    </FormControl>
                    <FormDescription>Total de tripulantes</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-10">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destino</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Destino del viaje</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-10">
              <FormField
                control={form.control}
                name="departure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salida</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        id={"departure"}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Hora de salida de la embarcación
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-10">
              <FormField
                control={form.control}
                name="arrival"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrada</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        id={"arrival"}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Hora aproximada de entrada de la embarcación
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              {isLoading ? (
                <Button disabled type="submit">
                  Loading
                </Button>
              ) : (
                <Button type="submit">Enviar</Button>
              )}
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}

interface RegistrationFormProps {
  onClose: () => void;
}
