"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { BaseFieldProps } from "./types";

export function CheckboxField<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
>({
  control,
  name,
  label,
  description,
  disabled,
  className,
}: BaseFieldProps<TValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex items-start gap-3 ${className ?? ""}`}>
          <FormControl>
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label ? <FormLabel>{label}</FormLabel> : null}
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
