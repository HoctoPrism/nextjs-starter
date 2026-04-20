import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, Pencil, Plus, X } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db/client";
import { examples } from "@/db/schema";
import { desc } from "drizzle-orm";

import { DeleteButton } from "./_components/delete-button";

export const dynamic = "force-dynamic";

export default async function ExamplesPage() {
  const rows = await db
    .select()
    .from(examples)
    .orderBy(desc(examples.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Examples</h1>
          <p className="text-muted-foreground text-sm">
            Démo CRUD avec tous les champs du formulaire
          </p>
        </div>
        <Button asChild>
          <Link href="/examples/new">
            <Plus className="mr-2 size-4" />
            Nouveau
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Actif</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Taille</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-muted-foreground py-8 text-center"
                >
                  Aucun example. Clique sur «&nbsp;Nouveau&nbsp;» pour en créer
                  un.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono">{row.id}</TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>
                    {row.active ? (
                      <Check className="size-4 text-green-600" />
                    ) : (
                      <X className="text-muted-foreground size-4" />
                    )}
                  </TableCell>
                  <TableCell>{row.rating ?? "—"}</TableCell>
                  <TableCell>{row.selectValue ?? "—"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(row.tags ?? []).map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {row.datetime
                      ? format(row.datetime, "d MMM yyyy HH:mm", {
                          locale: fr,
                        })
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        aria-label="Modifier"
                      >
                        <Link href={`/examples/${row.id}/edit`}>
                          <Pencil className="size-4" />
                        </Link>
                      </Button>
                      <DeleteButton id={row.id} name={row.name} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
