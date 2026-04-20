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
import { Switch } from "@/components/ui/switch";

import type { BaseFieldProps } from "./types";

export function SwitchField<
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
        <FormItem
          className={`flex items-center justify-between gap-3 rounded-lg border p-3 ${className ?? ""}`}
        >
          <div className="space-y-0.5">
            {label ? <FormLabel>{label}</FormLabel> : null}
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <FormMessage />
          </div>
          <FormControl>
            <Switch
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
