import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { db } from "@/db/client";
import { examples } from "@/db/schema";
import type { CreateExampleInput } from "@/lib/validators/example";
import {
  AUTOCOMPLETE_OPTIONS,
  RADIO_OPTIONS,
  SELECT_OPTIONS,
  TAG_OPTIONS,
} from "@/lib/validators/example";

import { ExampleForm } from "../../_components/example-form";

function narrowEnum<T extends readonly string[]>(
  values: T,
  v: string | null,
): T[number] | null {
  return v && (values as readonly string[]).includes(v) ? (v as T[number]) : null;
}

export default async function EditExamplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isFinite(id)) notFound();

  const row = await db.query.examples.findFirst({
    where: eq(examples.id, id),
  });
  if (!row) notFound();

  const initial: Partial<CreateExampleInput> = {
    name: row.name,
    description: row.description ?? "",
    active: row.active,
    rating: row.rating ?? 0,
    count: row.count,
    datetime: row.datetime ?? null,
    slider: row.slider,
    range: [row.rangeMin, row.rangeMax],
    radio: narrowEnum(RADIO_OPTIONS, row.radio),
    tags: (row.tags ?? []).filter((t): t is (typeof TAG_OPTIONS)[number] =>
      (TAG_OPTIONS as readonly string[]).includes(t),
    ),
    autocomplete: narrowEnum(AUTOCOMPLETE_OPTIONS, row.autocomplete),
    selectValue: narrowEnum(SELECT_OPTIONS, row.selectValue),
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Modifier l&apos;example #{id}</h1>
        <Button asChild variant="outline">
          <Link href="/examples">Retour</Link>
        </Button>
      </div>
      <ExampleForm mode="edit" exampleId={id} initialValues={initial} />
    </div>
  );
}
