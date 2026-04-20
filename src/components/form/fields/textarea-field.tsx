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
import { Textarea } from "@/components/ui/textarea";

import type { BaseFieldProps } from "./types";

type TextAreaFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> = BaseFieldProps<TValues, TName> & { rows?: number };

export function TextAreaField<
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
  rows = 4,
}: TextAreaFieldProps<TValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Textarea
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
