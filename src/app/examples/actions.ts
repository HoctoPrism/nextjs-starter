"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { examples } from "@/db/schema";
import {
  createExampleSchema,
  updateExampleSchema,
  type CreateExampleInput,
  type UpdateExampleInput,
} from "@/lib/validators/example";

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

async function requireUserId() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user.id;
}

function toRow(input: CreateExampleInput, userId: string) {
  return {
    name: input.name,
    description: input.description ?? null,
    active: input.active,
    rating: input.rating ?? null,
    count: input.count,
    datetime: input.datetime ?? null,
    slider: input.slider,
    rangeMin: input.range[0],
    rangeMax: input.range[1],
    radio: input.radio ?? null,
    tags: input.tags,
    autocomplete: input.autocomplete ?? null,
    selectValue: input.selectValue ?? null,
    userId,
  };
}

function collectFieldErrors(
  issues: { path: (string | number)[]; message: string }[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export async function createExample(
  input: CreateExampleInput,
): Promise<ActionResult> {
  const userId = await requireUserId();
  const parsed = createExampleSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Données invalides",
      fieldErrors: collectFieldErrors(parsed.error.issues),
    };
  }

  await db.insert(examples).values(toRow(parsed.data, userId));
  revalidatePath("/examples");
  return { ok: true };
}

export async function updateExample(
  id: number,
  input: UpdateExampleInput,
): Promise<ActionResult> {
  const userId = await requireUserId();
  const parsed = updateExampleSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Données invalides",
      fieldErrors: collectFieldErrors(parsed.error.issues),
    };
  }

  await db
    .update(examples)
    .set({ ...toRow(parsed.data, userId), updatedAt: new Date() })
    .where(eq(examples.id, id));
  revalidatePath("/examples");
  revalidatePath(`/examples/${id}/edit`);
  return { ok: true };
}

export async function deleteExample(id: number): Promise<ActionResult> {
  await requireUserId();
  await db.delete(examples).where(eq(examples.id, id));
  revalidatePath("/examples");
  return { ok: true };
}
