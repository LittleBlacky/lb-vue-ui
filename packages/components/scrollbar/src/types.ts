import type { CSSProperties, StyleValue } from "vue";

export interface LbScrollbarProps {
  /** 滚动条的高度 */
  height?: string | number;
  /** 滚动条的最大高度 */
  maxHeight?: string | number;
  /** 是否使用原生滚动条样式 */
  native?: boolean;
  /** 包裹容器的样式 */
  wrapStyle?: StyleValue;
  /** 包裹容器的类名 */
  wrapClass?: string | string[];
  /** 视图的样式 */
  viewStyle?: StyleValue;
  /** 视图的类名 */
  viewClass?: string | string[];
  /** 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 */
  noresize?: boolean;
  /** 视图的元素标签 */
  tag?: string;
  /** 总是显示滚动条 */
  always?: boolean;
  /** 滚动条最小尺寸 */
  minSize?: number;
  /** 视图的 id */
  id?: string;
  /** 视图的 role */
  role?: string;
  /** 视图的 aria-label */
  ariaLabel?: string;
  /** 视图的 aria-orientation */
  ariaOrientation?: "horizontal" | "vertical";
  /** 包裹容器的 tabindex */
  tabindex?: number | string;
}

export interface LbScrollbarEmits {
  /** 滚动时触发 */
  (e: "scroll", data: { scrollTop: number; scrollLeft: number }): void;
  /** 滚动到底部时触发 */
  (e: "end-reached"): void;
}

export interface LbScrollbarInstance {
  /** 处理滚动事件 */
  handleScroll: () => void;
  /** 滚动到特定位置 */
  scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
  /** 设置滚动条到顶部的距离 */
  setScrollTop: (scrollTop: number) => void;
  /** 设置滚动条到左边的距离 */
  setScrollLeft: (scrollLeft: number) => void;
  /** 手动更新滚动条状态 */
  update: () => void;
  /** 滚动条包裹容器的引用 */
  wrapRef: HTMLDivElement;
}
