import type { Ref } from "vue"

export interface LbSplitterPanelProps {
  size?: number
  minSize?: number
  maxSize?: number
  resizeabel?: boolean
}

export interface LbSplitterPanelEmits {
  (e: 'update:size', size: number | undefined): void
}

export type LbSplitterPanelInstance = {
  uid: number
  index: number
  sizeRef: Ref<number | undefined>
  props: LbSplitterPanelProps
}
