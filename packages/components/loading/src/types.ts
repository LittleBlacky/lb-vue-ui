import type { ExtractPropTypes, Component } from "vue";

export const loadingProps = {
  /** 显示的文本 */
  text: {
    type: String,
    default: "",
  },
  /** 自定义加载图标类名 */
  spinner: {
    type: String,
    default: "",
  },
  /** 遮罩背景色 */
  background: {
    type: String,
    default: "",
  },
  /** 是否全屏显示 */
  fullscreen: {
    type: Boolean,
    default: false,
  },

  /** 自定义类名 */
  customClass: {
    type: String,
    default: "",
  },
  /** 是否显示 */
  visible: {
    type: Boolean,
    default: true,
  },
} as const;

export interface LbLoadingProps {
  /** 显示的文本 */
  text?: string;
  /** 自定义加载图标类名 */
  spinner?: string;
  /** 遮罩背景色 */
  background?: string;
  /** 是否全屏显示 */
  fullscreen?: boolean;

  /** 自定义类名 */
  customClass?: string;
  /** 是否显示 */
  visible: boolean;
}

export interface LbLoadingEmits {
  /** 关闭后触发 */
  (e: "closed"): void;
}

export interface LbLoadingOptions {
  /** 显示的文本 */
  text?: string;
  /** 自定义加载图标类名 */
  spinner?: string;
  /** 遮罩背景色 */
  background?: string;
  /** 是否全屏显示 */
  fullscreen?: boolean;

  /** 自定义类名 */
  customClass?: string;
  /** 目标元素 */
  target?: HTMLElement | string;
}

export interface LbLoadingInstance {
  /** 关闭loading */
  close: () => void;
  /** 设置文本 */
  setText: (text: string) => void;
  /** 设置显示状态 */
  setVisible: (visible: boolean) => void;
  /** DOM元素 */
  $el: HTMLElement;
  /** 是否全屏 */
  fullscreen?: boolean;
  /** Vue应用实例 */
  app?: any;
}

/** Loading服务接口 */
export interface LbLoadingService {
  /** 显示loading */
  show: (options?: LbLoadingOptions) => LbLoadingInstance;
  /** 关闭loading */
  close: () => void;
  /** 更新文本 */
  updateText: (text: string) => void;
}

export interface LbLoadingDirectiveBinding {
  value: boolean | LbLoadingOptions;
  modifiers?: {
    fullscreen?: boolean;
  };
}

/** 带有静态service方法的Loading组件类型 */
export interface LbLoadingComponentType extends Component {
  service: (options?: LbLoadingOptions) => LbLoadingInstance;
}
