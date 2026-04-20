import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Connexion</h1>
        <p className="text-muted-foreground text-sm">
          Compte démo : demo@example.com / password1234
        </p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
      <p className="text-muted-foreground text-center text-sm">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-foreground underline">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
}
