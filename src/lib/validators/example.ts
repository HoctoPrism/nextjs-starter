import { z } from "zod";

export const RADIO_OPTIONS = ["option-a", "option-b", "option-c"] as const;
export const SELECT_OPTIONS = ["small", "medium", "large"] as const;
export const TAG_OPTIONS = ["alpha", "beta", "gamma", "delta"] as const;
export const AUTOCOMPLETE_OPTIONS = [
  "react",
  "next",
  "remix",
  "svelte",
  "vue",
  "solid",
] as const;

export const createExampleSchema = z
  .object({
    name: z
      .string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .max(100),
    description: z.string().max(500).optional().nullable(),
    active: z.boolean(),
    rating: z
      .number()
      .int()
      .min(0)
      .max(5)
      .optional()
      .nullable(),
    count: z.number().int().min(0).max(1000),
    datetime: z.date().optional().nullable(),
    slider: z.number().int().min(0).max(100),
    range: z.tuple([z.number().int(), z.number().int()]),
    radio: z.enum(RADIO_OPTIONS).optional().nullable(),
    tags: z.array(z.enum(TAG_OPTIONS)).default([]),
    autocomplete: z.enum(AUTOCOMPLETE_OPTIONS).optional().nullable(),
    selectValue: z.enum(SELECT_OPTIONS).optional().nullable(),
  })
  .refine((v) => v.range[0] <= v.range[1], {
    path: ["range"],
    message: "La borne min doit être inférieure ou égale à la borne max",
  });
export type CreateExampleInput = z.infer<typeof createExampleSchema>;

export const updateExampleSchema = createExampleSchema;
export type UpdateExampleInput = z.infer<typeof updateExampleSchema>;
