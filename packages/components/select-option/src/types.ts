import type { LbSelectValue } from "@lb-vue-ui/components";

export interface LbSelectOptionItem {
  label: string | number;
  value: LbSelectValue;
}

export interface LbSelectOptionProps extends LbSelectOptionItem {
  disabled?: boolean;
}
