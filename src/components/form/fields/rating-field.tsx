"use client";

import { Star } from "lucide-react";
import type { FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import type { BaseFieldProps } from "./types";

type RatingFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> = BaseFieldProps<TValues, TName> & {
  max?: number;
};

export function RatingField<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
>({
  control,
  name,
  label,
  description,
  disabled,
  className,
  max = 5,
}: RatingFieldProps<TValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const current = typeof field.value === "number" ? field.value : 0;
        return (
          <FormItem className={className}>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <FormControl>
              <div className="flex items-center gap-1">
                {Array.from({ length: max }).map((_, i) => {
                  const val = i + 1;
                  const active = val <= current;
                  return (
                    <button
                      key={val}
                      type="button"
                      disabled={disabled}
                      onClick={() => field.onChange(val === current ? 0 : val)}
                      className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`${val} étoile${val > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={cn(
                          "size-6 transition-colors",
                          active
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </FormControl>
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
