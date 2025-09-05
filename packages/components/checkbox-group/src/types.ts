import type { InjectionKey, ComputedRef } from "vue";

export interface CheckboxGroupContext {
  name: ComputedRef<string>;
  modelValue: ComputedRef<Array<string | number | boolean>>;
  size: ComputedRef<"small" | "base" | "large">;
  disabled: ComputedRef<boolean>;
  change: (value: string | number | boolean, checked: boolean) => void;
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> =
  Symbol("checkboxGroupKey");

export interface LbCheckboxGroupProps {
  modelValue?: Array<string | number | boolean>;
  name?: string;
  size?: "small" | "base" | "large";
  disabled?: boolean;
}

export interface LbCheckboxGroupEmits {
  (e: "change", value: Array<string | number | boolean>): void;
  (e: "update:modelValue", value: Array<string | number | boolean>): void;
}
