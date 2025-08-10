import type { InjectionKey, ComputedRef } from "vue";

export interface RadioGroupContext {
  name: ComputedRef<string>;
  modelValue: ComputedRef<string | number | boolean>;
  size: ComputedRef<"small" | "base" | "large">;
  disabled: ComputedRef<boolean>;
  change: (value: string | number | boolean) => void;
}

export const radioGroupKey: InjectionKey<RadioGroupContext> =
  Symbol("radioGroupKey");

export interface LbRadioGroupProps {
  modelValue?: string | number | boolean | null;
  name?: string;
  size?: "small" | "base" | "large";
  disabled?: boolean;
}

export interface LbRadioGroupEmits {
  (e: "change", value: string | number | boolean | null): void;
  (e: "update:modelValue", value: string | number | boolean | null): void;
}
