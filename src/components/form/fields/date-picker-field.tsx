"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { FieldPath, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { BaseFieldProps } from "./types";

export function DatePickerField<
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
}: BaseFieldProps<TValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const raw: unknown = field.value;
        const value = raw instanceof Date ? raw : undefined;
        return (
          <FormItem className={cn("flex flex-col", className)}>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      "justify-start text-left font-normal",
                      !value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {value
                      ? format(value, "PPP", { locale: fr })
                      : (placeholder ?? "Choisir une date")}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={(d) => field.onChange(d ?? null)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {description ? <FormDescription>{description}</FormDescription> : null}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
