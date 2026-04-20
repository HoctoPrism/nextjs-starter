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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import type { BaseFieldProps } from "./types";

type Option = { value: string; label: string };

type RadioGroupFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> = BaseFieldProps<TValues, TName> & {
  options: Option[];
};

export function RadioGroupField<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
>({
  control,
  name,
  label,
  description,
  disabled,
  className,
  options,
}: RadioGroupFieldProps<TValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value ?? ""}
              disabled={disabled}
              className="flex flex-col gap-2"
            >
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-sm"
                >
                  <RadioGroupItem value={opt.value} />
                  <span>{opt.label}</span>
                </label>
              ))}
            </RadioGroup>
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
