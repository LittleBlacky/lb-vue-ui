export interface LbSplitterBarProps {
  /**
   * 拖动条的方向
   */
  direction?: 'vertical' | 'horizontal'
  /**
   * 拖动条是否开始折叠
   */
  startCollapse?: boolean
  /**
   * 拖动条是否结束折叠
   */
  endCollapse?: boolean
  /**
   * 拖动条是否可调整大小
   */
  resizeabel?: boolean
  /**
   * 拖动条的索引
   */
  index: number
}

export type LbSplitterBarEmits = {
  /**
   * 拖动条拖动事件
   */
  (event: 'moving', moveDistance: number): void
  /**
   * 拖动条拖动结束事件
   */
  (event: 'moveEnd', index: number): void
  /**
   * 拖动条拖动开始事件
   */
  (event: 'moveStart', index: number): void
  /**
   * 拖动条折叠块折叠事件
   */
  (event: 'collapse', index: number, pos: string): void
}
