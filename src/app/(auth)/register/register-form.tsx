"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TextField } from "@/components/form/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { registerSchema, type RegisterInput } from "@/lib/validators/auth";

import { registerUser } from "./actions";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterInput) {
    startTransition(async () => {
      const r = await registerUser(values);
      if (!r.ok) {
        toast.error(r.error);
        if (r.fieldErrors) {
          for (const [name, message] of Object.entries(r.fieldErrors)) {
            form.setError(name as keyof RegisterInput, {
              type: "server",
              message,
            });
          }
        }
        return;
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      toast.success("Compte créé");
      router.push("/examples");
      router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          control={form.control}
          name="name"
          label="Nom"
          autoComplete="name"
        />
        <TextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
        />
        <TextField
          control={form.control}
          name="password"
          label="Mot de passe"
          type="password"
          autoComplete="new-password"
        />
        <TextField
          control={form.control}
          name="confirmPassword"
          label="Confirmer le mot de passe"
          type="password"
          autoComplete="new-password"
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Création…" : "Créer mon compte"}
        </Button>
      </form>
    </Form>
  );
}
