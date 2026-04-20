"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { deleteExample } from "../actions";

export function DeleteButton({ id, name }: { id: number; name: string }) {
  const [isPending, startTransition] = useTransition();

  function onDelete() {
    startTransition(async () => {
      const r = await deleteExample(id);
      if (r.ok) toast.success("Example supprimé");
      else toast.error(r.error);
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Supprimer">
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer l&apos;example</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer «&nbsp;{name}&nbsp;» ? Cette
            action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isPending}
          >
            {isPending ? "Suppression…" : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
