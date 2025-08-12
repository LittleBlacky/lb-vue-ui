import type { WritableComputedRef } from "vue";
import type { Placement } from "@floating-ui/dom";

export type LbSelectValue = string | object | number | null;

export type LbSelectModelValue = LbSelectValue | LbSelectValue[];

export interface LbSelectProps {
  modelValue?: LbSelectModelValue;
  readonly?: boolean;
  size?: "small" | "base" | "large";
  placeholder?: string;
  disabled?: boolean;
  placement?: Placement;
  offset?: number;
  valueKey?: string | number;
  multiple?: boolean;
  visible?: boolean;
  options?: Array<{ label: string | number; value: LbSelectValue }>;
  clearable?: boolean;
  filterable?: boolean;
  loading?: boolean;
  popperClass?: string;
  popperStyle?: Record<string, any>;
  inputProps?: Record<string, any>;
}

export interface LbSelectEmits {
  (e: "update:visible", value: boolean): void;
  (e: "update:modelValue", value: LbSelectModelValue): void;
  (e: "change", value: LbSelectModelValue): void;
}

export const LbSelectSymbol = Symbol("LbSelect");

export interface LbSelectInject {
  inputRef: LbSelectModelValue;
  multiple: boolean;
  valueKey: string | number;
  modelValue: WritableComputedRef<LbSelectModelValue>;
  disabled: boolean;
  toggleVisible: () => void;
}
