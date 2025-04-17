import { z } from "zod";
import { useForm } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const RegistrationFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre del bote debe ser por lo menos 2 caracteres",
  }),
  email: z
    .string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "Este correo no es valido" }),
  boat: z.string().optional().or(z.literal("")),
});

export function RegistrationForm({ tournamentId }: RegistrationFormProps) {
  const [register, { data, loading, error, reset }] = useMutation(REGISTATION);
  const form = useForm<z.infer<typeof RegistrationFormSchema>>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      boat: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!data) return;
    form.reset();
    reset();
    toast.success("Usuario registrado con exito");
  }, [data, form, reset]);

  useEffect(() => {
    if (!error) return;
    form.setError("root", {
      type: "custom",
      message: error.message,
    });
  }, [error, form]);

  const onSubmit = (values: z.infer<typeof RegistrationFormSchema>) => {
    const { name, email, boat } = values;
    const variables = {
      tournamentId,
      fisherman: {
        name,
        email,
      },
      boat: boat ? { name: boat } : undefined,
    };
    if (!boat) {
      delete variables.boat;
    }
    form.clearErrors();

    register({
      variables,
      mutation: variables.boat ? REGISTATION_WITH_BOAT : REGISTATION,
    });
  };
  return (
    <Form {...form}>
      <h2>Formulatio de registro</h2>
      {errors.root?.message && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormDescription>Nombre del participante</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormDescription>Email del participante</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-10">
            <FormField
              control={form.control}
              name="boat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bote</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Nombre del bote</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">{loading ? "Procesando" : "Enviar"}</Button>
      </form>
    </Form>
  );
}

interface RegistrationFormProps {
  tournamentId: number;
}

const REGISTATION = gql`
  mutation CreateRegistration($tournamentId: ID!, $fisherman: FishermanInput!) {
    fishermanCreate(tournamentId: $tournamentId, input: $fisherman) {
      id
      name
      email
      isEnabled
    }
  }
`;

const REGISTATION_WITH_BOAT = gql`
  mutation CreateRegistration(
    $tournamentId: ID!
    $fisherman: FishermanInput!
    $boat: BoatInput!
  ) {
    fishermanCreate(tournamentId: $tournamentId, input: $fisherman) {
      id
      name
      email
      isEnabled
    }
    boatCreate(tournamentId: $tournamentId, input: $boat) {
      id
      name
    }
  }
`;
