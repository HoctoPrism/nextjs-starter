"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db/client";
import { users } from "@/db/schema";
import { registerSchema, type RegisterInput } from "@/lib/validators/auth";

export type RegisterResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof RegisterInput, string>> };

export async function registerUser(input: RegisterInput): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Formulaire invalide", fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (existing) {
    return {
      ok: false,
      error: "Email déjà utilisé",
      fieldErrors: { email: "Un compte existe déjà avec cet email" },
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ name, email, passwordHash });

  return { ok: true };
}
