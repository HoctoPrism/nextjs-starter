import Link from "next/link";

import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Inscription</h1>
        <p className="text-muted-foreground text-sm">Créez votre compte</p>
      </div>
      <RegisterForm />
      <p className="text-muted-foreground text-center text-sm">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-foreground underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
