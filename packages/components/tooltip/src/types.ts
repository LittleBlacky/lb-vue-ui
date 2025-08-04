import type { ComputedRef, Ref } from "vue";
import type { FloatingElement, ReferenceElement } from "@floating-ui/dom";

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
  appendTo?: ReferenceElement;
  trigger?: LbToolTipTriggerOptions;
  transition?: string;
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
}
export type LbToolTipVisibleModel = boolean;
export interface LbToolTipInstance {
  popperRef: Ref<FloatingElement>;
  show: () => void;
  hide: () => void;
  updatePosition: () => void;
}
