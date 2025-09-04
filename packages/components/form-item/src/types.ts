export interface LbFormItemProps {
  prop?: string;
  label?: string;
  labelWidth?: string | number;
  labelAlign?: "left" | "right";
  required?: boolean;
  showMessage?: boolean;
  inlineMessage?: boolean;
  help?: string;
}
export interface LbFormItemEmits {
  (e: "validate", isValid: boolean, message?: string): void;
}
