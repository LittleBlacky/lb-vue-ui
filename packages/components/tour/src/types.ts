import type { Ref } from "vue";
import type { LbToolTipProps } from "../../tooltip/src/types";

// 步骤配置接口
export interface LbTourStepConfig {
  target: string | HTMLElement;
  title?: string;
  description?: string;
  cover?: string;
  placement?: LbToolTipProps["placement"];
  mask?: boolean;
  type?: "default" | "primary";
}

// Tour 组件属性接口
export interface LbTourProps {
  modelValue?: boolean;
  current?: number;
  open?: boolean;
  mask?: boolean;
  closable?: boolean;
  type?: "default" | "primary";
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
  indicatorsRender?: (current: number, total: number) => any;
  zIndex?: number;
  showArrow?: boolean;
  showIndicators?: boolean;
  placement?: LbToolTipProps["placement"];
}

// Tour 实例接口
export interface LbTourInstance {
  current: Ref<number>;
  steps: Ref<LbTourStepConfig[]>;
  start: () => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  goTo: (step: number) => void;
}
