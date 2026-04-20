"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type { BaseFieldProps } from "./types";

type NumberFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> = BaseFieldProps<TValues, TName> & {
  min?: number;
  max?: number;
  step?: number;
};

export function NumberField<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
>({
  control,
  name,
  label,
  description,
  placeholder,
  disabled,
  className,
  min,
  max,
  step,
}: NumberFieldProps<TValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Input
              type="number"
              inputMode="numeric"
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              value={field.value ?? ""}
              onChange={(e) => {
                const raw = e.target.value;
                field.onChange(raw === "" ? null : Number(raw));
              }}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
