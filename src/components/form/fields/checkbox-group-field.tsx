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

type Option = { value: string; label: string };

type CheckboxGroupFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> = BaseFieldProps<TValues, TName> & {
  options: Option[];
};

export function CheckboxGroupField<
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
}: CheckboxGroupFieldProps<TValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value: string[] = Array.isArray(field.value) ? field.value : [];
        const toggle = (val: string, checked: boolean) => {
          field.onChange(
            checked ? [...value, val] : value.filter((v) => v !== val),
          );
        };
        return (
          <FormItem className={className}>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <div className="flex flex-col gap-2">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-sm"
                >
                  <FormControl>
                    <Checkbox
                      checked={value.includes(opt.value)}
                      onCheckedChange={(checked) =>
                        toggle(opt.value, !!checked)
                      }
                      disabled={disabled}
                    />
                  </FormControl>
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
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
