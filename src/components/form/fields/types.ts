import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type BaseFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues> = FieldPath<TValues>,
> = {
  control: Control<TValues>;
  name: TName;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};
