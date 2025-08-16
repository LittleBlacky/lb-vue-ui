export interface LbTagProps {
  type?: "primary" | "success" | "info" | "warning" | "danger";
  size?: "large" | "base" | "small";
  closable?: boolean;
  hit?: boolean;
  disableTransitions?: boolean;
  color?: string;
  effect?: "dark" | "light" | "plain";
}
export interface LbTagEmits {
  (e: "close", event: MouseEvent): void;
}
