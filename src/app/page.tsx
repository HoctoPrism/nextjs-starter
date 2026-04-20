import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">NextJS Starter</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          App Router · shadcn/ui · Tailwind v4 · Drizzle + SQLite · Auth.js v5
          · react-hook-form + zod
        </p>
        <div className="flex justify-center gap-2">
          {session?.user ? (
            <Button asChild>
              <Link href="/examples">Voir les examples</Link>
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link href="/register">Commencer</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Connexion</Link>
              </Button>
            </>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Formulaires réutilisables</CardTitle>
            <CardDescription>
              15 champs typés dans{" "}
              <code className="bg-muted rounded px-1 text-xs">
                src/components/form/fields
              </code>
              , branchés sur react-hook-form et validés via zod.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SQLite + Drizzle</CardTitle>
            <CardDescription>
              <code className="bg-muted rounded px-1 text-xs">
                npm run db:push
              </code>
              {" "}pour créer le schéma,{" "}
              <code className="bg-muted rounded px-1 text-xs">
                npm run db:seed
              </code>
              {" "}pour des données de démo.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Auth.js v5</CardTitle>
            <CardDescription>
              Provider Credentials + DrizzleAdapter + middleware de protection.
              Compte démo :{" "}
              <code className="bg-muted rounded px-1 text-xs">
                demo@example.com / password1234
              </code>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Server Actions</CardTitle>
            <CardDescription>
              CRUD sans API routes — zod re-validation côté serveur,{" "}
              <code className="bg-muted rounded px-1 text-xs">
                revalidatePath
              </code>
              {" "}pour rafraîchir les Server Components.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
