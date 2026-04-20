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
import { Slider } from "@/components/ui/slider";

import type { BaseFieldProps } from "./types";

type SliderFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> = BaseFieldProps<TValues, TName> & {
  min?: number;
  max?: number;
  step?: number;
};

export function SliderField<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
>({
  control,
  name,
  label,
  description,
  disabled,
  className,
  min = 0,
  max = 100,
  step = 1,
}: SliderFieldProps<TValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const v =
          typeof field.value === "number" ? field.value : Number(min);
        return (
          <FormItem className={className}>
            <div className="flex items-center justify-between">
              {label ? <FormLabel>{label}</FormLabel> : <span />}
              <span className="text-muted-foreground text-sm tabular-nums">
                {v}
              </span>
            </div>
            <FormControl>
              <Slider
                min={min}
                max={max}
                step={step}
                value={[v]}
                onValueChange={([n]) => field.onChange(n)}
                disabled={disabled}
              />
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
