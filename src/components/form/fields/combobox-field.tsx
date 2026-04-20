"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import type { FieldPath, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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

type Option = { value: string; label: string };

type ComboboxFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> = BaseFieldProps<TValues, TName> & {
  options: Option[];
  emptyMessage?: string;
};

export function ComboboxField<
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
  options,
  emptyMessage = "Aucun résultat.",
}: ComboboxFieldProps<TValues, TName>) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected = options.find((o) => o.value === field.value);
        return (
          <FormItem className={cn("flex flex-col", className)}>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className={cn(
                      "justify-between",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {selected?.label ?? placeholder ?? "Choisir…"}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Rechercher…" />
                  <CommandList>
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup>
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={opt.label}
                          onSelect={() => {
                            field.onChange(opt.value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 size-4",
                              opt.value === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {opt.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
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
