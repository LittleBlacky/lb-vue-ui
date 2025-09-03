export interface LbIconProps {
  color?: string;
  size?: number | string;
  spin?: boolean;
  reverse?: boolean;
}

export type LbIconEmits = {
  /**
   * 示例事件
   */
  (e: "example-event", value: string): void;
  // 添加更多 emits...
};
