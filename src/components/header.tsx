import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const session = await auth();

  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4">
        <Link href="/" className="font-semibold">
          NextJS Starter
        </Link>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">Accueil</Link>
          </Button>
          {session?.user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/examples">Examples</Link>
              </Button>
              <span className="text-muted-foreground hidden text-sm sm:inline">
                {session.user.email}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button type="submit" variant="outline" size="sm">
                  Déconnexion
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Inscription</Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
