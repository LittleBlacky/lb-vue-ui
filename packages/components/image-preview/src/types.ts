export interface LbImagePreviewProps {
  // 是否显示预览
  visible?: boolean;
  // 图片列表
  previewList: string[];
  // 初始索引
  initialIndex?: number;
  // 是否显示关闭按钮
  showClose?: boolean;
  // 是否显示工具栏
  showToolbar?: boolean;
  // 是否显示缩略图
  showThumbnail?: boolean;
  // 是否显示索引
  showIndex?: boolean;
  // 缩放步长
  zoomStep?: number;
  // 最大缩放比例
  maxZoom?: number;
  // 最小缩放比例
  minZoom?: number;
  // 是否循环显示
  loop?: boolean;
  // 是否支持键盘操作
  enableKeyboard?: boolean;
  // 是否支持滚轮缩放
  enableWheel?: boolean;
  // 是否支持拖拽
  enableDrag?: boolean;
  // 是否支持旋转
  enableRotate?: boolean;
  // z-index
  zIndex?: number;
  // 遮罩层背景色
  maskBackground?: string;
}

export interface LbImagePreviewEmits {
  (e: "update:visible", visible: boolean): void;
  (e: "change", index: number): void;
  (e: "close"): void;
  (e: "rotate", angle: number): void;
  (e: "scale", scale: number): void;
}
