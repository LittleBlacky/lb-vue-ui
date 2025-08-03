import type { ExtractPropTypes } from "vue";

export const loadingProps = {
  text: {
    type: String,
    default: null,
  },
  spinner: {
    type: String,
    default: null,
  },
  background: {
    type: String,
    default: null,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  lock: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: "",
  },
} as const;

export type LoadingProps = ExtractPropTypes<typeof loadingProps>;

export interface LoadingOptions {
  text?: string;
  spinner?: string;
  background?: string;
  fullscreen?: boolean;
  lock?: boolean;
  customClass?: string;
  target?: HTMLElement | string;
}

export interface LoadingInstance {
  close: () => void;
  setText: (text: string) => void;
  $el: HTMLElement;
  fullscreen?: boolean;
}
