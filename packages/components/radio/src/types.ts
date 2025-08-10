export interface LbRadioProps {
  modelValue?: string | number | boolean | null;
  label?: string | number | boolean;
  value?: string | number | boolean;
  disabled?: boolean;
  name?: string;
  size?: "small" | "base" | "large";
}

export interface LbRadioEmits {
  (e: "change", value: string | number | boolean): void;
  (e: "update:modelValue", value: string | number | boolean | null): void;
}
