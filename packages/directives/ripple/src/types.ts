import type { DirectiveBinding } from "vue";

export interface RippleBinding extends DirectiveBinding {
  value: {
    color?: string;
    duration?: number;
    disabled?: boolean;
  };
}
