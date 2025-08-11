import type { ComputedRef, Ref } from "vue";
import type { FloatingElement } from "@floating-ui/dom";

export type LbToolTipTriggerOptions = "hover" | "click" | "focus";
export type LbToolTipTriggerEvents =
  | "mouseenter"
  | "mouseleave"
  | "click"
  | "focusin"
  | "focusout";
export type LbToolTipTriggerHandlerEvents = () => void;
export type LbToolTipOuterEvents = ComputedRef<
  Partial<Record<LbToolTipTriggerEvents, LbToolTipTriggerHandlerEvents>>
>;
export interface LbToolTipProps {
  content: string;
  showAfter?: number;
  hideAfter?: number;
  strategy?: "absolute" | "fixed";
  trigger?: LbToolTipTriggerOptions;
  transition?: string;
  visible?: boolean;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
  offset?: number;
  disabled?: boolean;
  popperClass?: string;
  virtualTriggering?: boolean;
  virtualRef?: HTMLElement;
  appendTo?: HTMLElement | string | false;
}
export type LbToolTipVisibleModel = boolean;
export interface LbToolTipInstance {
  popperRef: Ref<FloatingElement>;
  show: () => void;
  hide: () => void;
  updatePosition: () => void;
}
