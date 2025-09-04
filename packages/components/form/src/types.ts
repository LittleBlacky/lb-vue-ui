import type { InjectionKey } from "vue";

export type FormLabelPosition = "left" | "right" | "top";
export type FormSize = "small" | "base" | "large";

export interface LbFormRuleItem {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (
    value: unknown,
    model: Record<string, unknown>
  ) => boolean | string | Promise<boolean | string>;
  trigger?: Array<"change" | "blur"> | "change" | "blur";
}

export type LbFormRules = Record<string, LbFormRuleItem | LbFormRuleItem[]>;

export interface LbFormProps {
  model?: Record<string, any>;
  rules?: LbFormRules;
  inline?: boolean;
  disabled?: boolean;
  size?: FormSize;
  labelPosition?: FormLabelPosition;
  labelWidth?: string | number;
  labelAlign?: "left" | "right";
  labelSuffix?: string;
  showMessage?: boolean;
  inlineMessage?: boolean;
  statusIcon?: boolean;
  validateOnRuleChange?: boolean;
  hideRequiredAsterisk?: boolean;
  requireAsteriskPosition?: "left" | "right";
}

export interface LbFormEmits {
  (e: "validate", prop: string, isValid: boolean, message?: string): void;
}

export interface LbFormContext {
  props: LbFormProps;
  addField: (field: LbFormItemContext) => void;
  removeField: (field: LbFormItemContext) => void;
  validateField: (
    prop: string,
    trigger?: "change" | "blur"
  ) => Promise<boolean>;
  validate: () => Promise<boolean>;
  resetFields: () => void;
  clearValidate: (props?: string | string[]) => void;
}

export interface LbFormItemContext {
  prop?: string;
  validate: (trigger?: "change" | "blur") => Promise<boolean>;
  resetField: () => void;
}

export const formContextKey: InjectionKey<LbFormContext> = Symbol("LbForm");
