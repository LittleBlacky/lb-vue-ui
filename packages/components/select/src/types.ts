import type { WritableComputedRef, Ref } from "vue";
import type { Placement } from "@floating-ui/dom";

export type LbSelectValue = string | Record<string, any> | number | null;

export type LbSelectModelValue = LbSelectValue | LbSelectValue[];

export interface LbSelectOptionsProps {
  label: string;
  value: string;
}

export interface LbSelectProps {
  modelValue?: LbSelectModelValue;
  readonly?: boolean;
  size?: "small" | "base" | "large";
  placeholder?: string;
  props?: LbSelectOptionsProps;
  disabled?: boolean;
  placement?: Placement;
  offset?: number;
  valueKey?: string | number;
  multiple?: boolean;
  visible?: boolean;
  options?: Array<{ [key: string]: any }>;
  clearable?: boolean;
  filterable?: boolean;
  filterMethod?: (value: string, option: LbSelectOptionsProps) => boolean;
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
  multiple: boolean;
  valueKey: string | number;
  modelValue: WritableComputedRef<LbSelectModelValue>;
  disabled: boolean;
  props: LbSelectOptionsProps;
  selectOptions: Ref<
    Array<{
      label: string | number;
      value: LbSelectValue;
      visible: Ref<boolean>;
    }>
  >;
  toggleVisible: () => void;
}
