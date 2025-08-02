export interface LbCardProps {
  /** 卡片标题 */
  header?: string;
  /** 卡片副标题 */
  subtitle?: string;
  /** 是否显示头部 */
  showHeader?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 阴影效果 */
  shadow?: "always" | "hover" | "never";
  /** 卡片宽度 */
  width?: string | number;
  /** 卡片高度 */
  height?: string | number;
  /** 头部样式类 */
  headerClass?: string;
  /** 内容样式类 */
  bodyClass?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可点击 */
  clickable?: boolean;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 卡片圆角 */
  radius?: string | number;
  /** 卡片背景色 */
  backgroundColor?: string;
  /** 头部背景色 */
  headerBackgroundColor?: string;
}

export interface LbCardEmits {
  /** 点击事件 */
  (e: "click", event: MouseEvent): void;
  /** 头部点击事件 */
  (e: "header-click", event: MouseEvent): void;
}
