"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  CheckboxGroupField,
  ComboboxField,
  DateTimePickerField,
  NumberField,
  RadioGroupField,
  RangeSliderField,
  RatingField,
  SelectField,
  SliderField,
  SwitchField,
  TextAreaField,
  TextField,
} from "@/components/form/fields";
import {
  AUTOCOMPLETE_OPTIONS,
  RADIO_OPTIONS,
  SELECT_OPTIONS,
  TAG_OPTIONS,
  createExampleSchema,
  type CreateExampleInput,
} from "@/lib/validators/example";
import { createExample, updateExample, type ActionResult } from "../actions";

const defaultValues: CreateExampleInput = {
  name: "",
  description: "",
  active: false,
  rating: 0,
  count: 0,
  datetime: null,
  slider: 50,
  range: [20, 80],
  radio: null,
  tags: [],
  autocomplete: null,
  selectValue: null,
};

function toOptions<const T extends readonly string[]>(values: T) {
  return values.map((v) => ({ value: v, label: v }));
}

type ExampleFormProps = {
  mode: "create" | "edit";
  exampleId?: number;
  initialValues?: Partial<CreateExampleInput>;
};

export function ExampleForm({
  mode,
  exampleId,
  initialValues,
}: ExampleFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateExampleInput>({
    resolver: zodResolver(createExampleSchema),
    defaultValues: { ...defaultValues, ...initialValues },
  });

  function applyServerErrors(result: Extract<ActionResult, { ok: false }>) {
    toast.error(result.error);
    if (result.fieldErrors) {
      for (const [name, message] of Object.entries(result.fieldErrors)) {
        form.setError(name as keyof CreateExampleInput, {
          type: "server",
          message,
        });
      }
    }
  }

  function onSubmit(values: CreateExampleInput) {
    startTransition(async () => {
      const result =
        mode === "create"
          ? await createExample(values)
          : await updateExample(exampleId!, values);

      if (!result.ok) return applyServerErrors(result);

      toast.success(mode === "create" ? "Example créé" : "Example mis à jour");
      router.push("/examples");
      router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de base</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextField
              control={form.control}
              name="name"
              label="Nom"
              placeholder="Mon example"
            />
            <TextAreaField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Optionnel"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NumberField
                control={form.control}
                name="count"
                label="Count"
                min={0}
                max={1000}
              />
              <RatingField
                control={form.control}
                name="rating"
                label="Note"
              />
            </div>
            <SwitchField
              control={form.control}
              name="active"
              label="Actif"
              description="Rendre cet example visible publiquement"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Choix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectField
                control={form.control}
                name="selectValue"
                label="Taille"
                placeholder="Choisir une taille"
                options={toOptions(SELECT_OPTIONS)}
              />
              <ComboboxField
                control={form.control}
                name="autocomplete"
                label="Framework favori"
                placeholder="Rechercher un framework"
                options={toOptions(AUTOCOMPLETE_OPTIONS)}
              />
            </div>
            <RadioGroupField
              control={form.control}
              name="radio"
              label="Option"
              options={toOptions(RADIO_OPTIONS)}
            />
            <CheckboxGroupField
              control={form.control}
              name="tags"
              label="Tags"
              options={toOptions(TAG_OPTIONS)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valeurs numériques &amp; dates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <SliderField
              control={form.control}
              name="slider"
              label="Slider"
            />
            <RangeSliderField
              control={form.control}
              name="range"
              label="Range"
            />
            <DateTimePickerField
              control={form.control}
              name="datetime"
              label="Date et heure"
            />
          </CardContent>
        </Card>

        <CardFooter className="flex justify-end gap-2 px-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Envoi…"
              : mode === "create"
                ? "Créer"
                : "Enregistrer"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
