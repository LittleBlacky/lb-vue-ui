export interface LbIconProps {
  color: string,
  size: number,
  name: string
}

export type LbIconEmits = {
  /**
   * 示例事件
   */
  (e: 'example-event', value: string): void;
  // 添加更多 emits...
};
