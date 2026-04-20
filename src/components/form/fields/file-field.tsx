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

type FileFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> = BaseFieldProps<TValues, TName> & {
  accept?: string;
  multiple?: boolean;
};

export function FileField<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
>({
  control,
  name,
  label,
  description,
  disabled,
  className,
  accept,
  multiple,
}: FileFieldProps<TValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, name: fieldName, ref } }) => (
        <FormItem className={className}>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Input
              type="file"
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              name={fieldName}
              ref={ref}
              onBlur={onBlur}
              onChange={(e) => {
                const files = e.target.files;
                if (!files || files.length === 0) return onChange(null);
                onChange(multiple ? Array.from(files) : files[0]);
              }}
            />
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
