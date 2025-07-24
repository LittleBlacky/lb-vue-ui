import type { Ref, InjectionKey, ShallowReactive } from 'vue'
import type { LbSplitterPanelInstance } from '../../splitter-panel/types'

export type Direction = 'horizontal' | 'vertical'

export interface LbSplitterProps {
  direction?: Direction
  dragging?: boolean
}

export interface LbSplitterEmits {
  (e: 'resize', sizes: number[]): void
}

export interface LbSplitterContext {
  props: LbSplitterProps
  panelInstances: Ref<ShallowReactive<LbSplitterPanelInstance>[]>
  splitterSize: Ref<number>
  panelTotalSize: Ref<number>
  isDragging: boolean
  emit: LbSplitterEmits
  registerPanel: (instance: ShallowReactive<LbSplitterPanelInstance>) => void
  unregisterPanel: (index: number) => void
}

export const LbSplitterContextKey: InjectionKey<LbSplitterContext> = Symbol('LbSplitterContext')
