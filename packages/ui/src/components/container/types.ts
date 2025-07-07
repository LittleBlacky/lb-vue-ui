export interface LbContainerProps {
  /**
   * 示例属性
   */
  exampleProp?: string;
  // 添加更多 props...
}

export type LbContainerEmits = {
  /**
   * 示例事件
   */
  (e: 'example-event', value: string): void;
  // 添加更多 emits...
};
