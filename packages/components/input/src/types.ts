export interface LbInputAutoSize {
  minRows?: number;
  maxRows?: number;
}

export interface LbInputProps {
  modelValue?: string | number;
  type?: "text" | "password" | "textarea" | "number";
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  prefixIcon?: string;
  autofocus?: boolean;
  autosize?: boolean | LbInputAutoSize;
  suffixIcon?: string;
  size?: "large" | "default" | "small";
  rows?: number;
  cols?: number;
  maxlength?: number;
  minlength?: number;
  showWordLimit?: boolean;
}

export interface LbInputEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "clear"): void;
}
