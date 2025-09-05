export interface LbCheckboxProps {
  modelValue?: boolean | null;
  label?: string | number | boolean;
  value?: string | number | boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  name?: string;
  size?: "small" | "base" | "large";
}

export interface LbCheckboxEmits {
  (e: "change", value: boolean): void;
  (e: "update:modelValue", value: boolean | null): void;
}
