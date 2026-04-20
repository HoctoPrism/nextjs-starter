"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { TextField } from "@/components/form/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginSchema, type LoginInput } from "@/lib/validators/auth";

export function LoginForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/examples";
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: LoginInput) {
    startTransition(async () => {
      try {
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
          redirectTo: callbackUrl,
        });
      } catch {
        toast.error("Email ou mot de passe incorrect");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <TextField
          control={form.control}
          name="password"
          label="Mot de passe"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
}
