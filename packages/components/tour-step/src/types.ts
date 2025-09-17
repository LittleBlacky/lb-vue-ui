import type { LbToolTipProps } from "../../tooltip/src/types";

export interface LbTourStepProps {
  target: string | HTMLElement;
  title?: string;
  description?: string;
  cover?: string;
  placement?: LbToolTipProps["placement"];
  mask?: boolean;
  type?: "default" | "primary";
}

export interface LbTourStepEmits {
  /** 点击上一步 */
  (e: "prev"): void;
  /** 点击下一步 */
  (e: "next"): void;
  /** 点击关闭 */
  (e: "close"): void;
  /** 点击完成 */
  (e: "finish"): void;
}
