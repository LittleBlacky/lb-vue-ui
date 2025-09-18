export interface LbProgressProps {
  /** 进度百分比，范围 0-100 */
  percentage?: number;
  /** 进度条类型 */
  type?: "line" | "circle";
  /** 进度条状态 */
  status?: "success" | "danger" | "warning" | "info";
  /** 进度条尺寸 */
  size?: "small" | "base" | "large";
  /** 进度条宽度，仅在 type 为 'line' 时有效 */
  strokeWidth?: number;
  /** 进度条颜色 */
  color?:
    | string
    | Array<{ color: string; percentage: number }>
    | ((percentage: number) => string);
  /** 进度条背景色 */
  backgroundColor?: string;
  /** 是否显示文字 */
  showText?: boolean;
  /** 文字内容 */
  text?: string;
  /** 文字位置 */
  textPosition?: "inside" | "outside";
  /** 是否显示动画效果 */
  animated?: boolean;
  /** 动画持续时间（毫秒） */
  duration?: number;
  /** 是否显示进度条内部图标 */
  showIcon?: boolean;
  /** 自定义图标 */
  icon?: string;
  /** 进度条圆角 */
  borderRadius?: string | number;
  /** 进度条高度，仅在 type 为 'line' 时有效 */
  height?: number;
  /** 进度条宽度，仅在 type 为 'line' 时有效 */
  width?: number;
  /** 圆形进度条半径，仅在 type 为 'circle' 时有效 */
  radius?: number;
  /** 圆形进度条描边宽度，仅在 type 为 'circle' 时有效 */
  strokeWidthCircle?: number;
  /** 圆形进度条描边端点样式 */
  strokeLinecap?: "round" | "square" | "butt";
  /** 是否显示进度条轨道 */
  showTrack?: boolean;
  /** 进度条轨道颜色 */
  trackColor?: string;
  /** 是否可交互 */
  interactive?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 格式化显示文本 */
  format?: (percentage: number) => string;
  /** 是否显示条纹效果 */
  striped?: boolean;
}

export interface LbProgressEmits {
  (e: "change", percentage: number): void;
  (e: "click", event: MouseEvent): void;
}
