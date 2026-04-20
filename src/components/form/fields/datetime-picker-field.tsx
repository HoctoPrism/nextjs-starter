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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { BaseFieldProps } from "./types";

function setTimeOnDate(base: Date, time: string): Date {
  const [h, m] = time.split(":").map((n) => parseInt(n, 10) || 0);
  const next = new Date(base);
  next.setHours(h, m, 0, 0);
  return next;
}

export function DateTimePickerField<
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
        const timeValue = value ? format(value, "HH:mm") : "12:00";
        return (
          <FormItem className={cn("flex flex-col", className)}>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={disabled}
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
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
                    onSelect={(d) => {
                      if (!d) return field.onChange(null);
                      field.onChange(setTimeOnDate(d, timeValue));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                className="w-[120px]"
                disabled={disabled || !value}
                value={timeValue}
                onChange={(e) =>
                  value && field.onChange(setTimeOnDate(value, e.target.value))
                }
              />
            </div>
            {description ? <FormDescription>{description}</FormDescription> : null}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
