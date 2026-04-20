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

type TextFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> = BaseFieldProps<TValues, TName> & {
  type?: "text" | "email" | "password" | "url" | "tel" | "search";
  autoComplete?: string;
};

export function TextField<
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
  type = "text",
  autoComplete,
}: TextFieldProps<TValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
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
