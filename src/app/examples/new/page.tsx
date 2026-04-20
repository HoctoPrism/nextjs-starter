import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ExampleForm } from "../_components/example-form";

export default function NewExamplePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Nouvel example</h1>
        <Button asChild variant="outline">
          <Link href="/examples">Retour</Link>
        </Button>
      </div>
      <ExampleForm mode="create" />
    </div>
  );
}
