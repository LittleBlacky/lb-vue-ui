<template>
  <div :class="classes" :style="styles" v-bind="$attrs" ref="panelRef">
    <slot></slot>
  </div>
  <SplitterBar
    v-if="hasBar"
    :direction="splitter?.props.direction"
    :startCollapse="startCollapse"
    :endCollapse="endCollapse"
    :index="panelInstance.index"
    :resizeabel="resizeabel"
    @moving="onMoving"
    @collapse="onCollapse"
  ></SplitterBar>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  watch,
  ref,
  onMounted,
  getCurrentInstance,
  onUnmounted,
  shallowReactive,
} from 'vue'
import { createNamespace } from '@/utils/createNamespace'
import { LbSplitterContextKey } from '../splitter/types'
import SplitterBar from '../splitter-bar'
import type { LbSplitterPanelProps, LbSplitterPanelEmits, LbSplitterPanelInstance } from './types'
import type { LbSplitterContext } from '../splitter/types'
defineOptions({
  name: 'LbSplitterPanel',
  inheritAttrs: false,
})

const panelRef = ref<HTMLDivElement>()

const props = withDefaults(defineProps<LbSplitterPanelProps>(), {
  resizeabel: true,
  minSize: 0,
  maxSize: Infinity,
})

const sizeModel = ref(props.size)

const instance = getCurrentInstance()

const panelInstance = shallowReactive<LbSplitterPanelInstance>({
  uid: instance?.uid as number,
  index: -1,
  ...props,
  sizeRef: sizeModel,
})

watch(
  () => props.size,
  () => {
    sizeModel.value = props.size
  },
)

watch(sizeModel, (newVal) => {
  if (newVal === undefined) return
  if (newVal < 1) sizeModel.value = 0
  emits('update:size', sizeModel.value)
})

const emits = defineEmits<LbSplitterPanelEmits>()

const splitter = inject<LbSplitterContext | undefined>(LbSplitterContextKey)

const bem = createNamespace('splitter-panel')

const classes = computed(() => [bem.b()])

const styles = computed(() => {
  const style: Record<string, string> = {}
  const size = sizeModel.value ?? 0
  style.flexBasis = `${size}px`
  style.flexGrow = '0'
  style.flexShrink = '0'
  if (splitter) {
    if (props.minSize) {
      style.minWidth = splitter?.props.direction === 'horizontal' ? `${props.minSize}px` : '0'
      style.minHeight = splitter?.props.direction === 'vertical' ? `${props.minSize}px` : '0'
    }
    if (props.maxSize) {
      style.maxWidth = splitter?.props.direction === 'horizontal' ? `${props.maxSize}px` : 'unset'
      style.maxHeight = splitter?.props.direction === 'vertical' ? `${props.maxSize}px` : 'unset'
    }
  }
  return style
})

const startCollapse = computed(() => {
  if (!sizeModel.value) return
  return sizeModel.value > 0 && props.resizeabel && splitter?.isDragging
})

const endCollapse = computed(() => {
  const nextIndex = panelInstance.index + 1
  const nextInstance = splitter?.panelInstances.value[nextIndex]
  const nextSize = splitter?.panelInstances.value[nextIndex].sizeRef.value
  if (!nextInstance || !nextSize) return false
  return nextSize > 0 && nextInstance.resizeabel && splitter?.isDragging
})

watch(sizeModel, (newVal) => {
  if (newVal === undefined) return
})

const onMoving = (distance: number) => {
  if (!splitter?.isDragging || !props.resizeabel) return
  const curSize = sizeModel.value as number
  const curMaxSize = props.maxSize
  const curMinSize = props.minSize
  const curInstance = panelInstance
  const nextInstance = splitter.panelInstances.value[curInstance.index + 1]
  const nextSize = splitter.panelInstances.value[nextInstance.index].sizeRef.value as number
  const nextMaxSize = nextInstance.maxSize as number
  const nextMinSize = nextInstance.minSize as number
  const totalSize = curSize + nextSize
  let curNewSize = curSize + distance
  let nextNewSize = totalSize - curNewSize
  if (curNewSize > curMaxSize || curNewSize < curMinSize) return
  if (nextNewSize > nextMaxSize || nextNewSize < nextMinSize) return
  curNewSize = Math.max(props.minSize, Math.min(props.maxSize, totalSize, curNewSize))
  nextNewSize = Math.max(props.minSize, Math.min(props.maxSize, totalSize, nextNewSize))
  sizeModel.value = curNewSize
  splitter.panelInstances.value[curInstance.index + 1].sizeRef.value = nextNewSize
}

const onCollapse = (index: number, pos: string) => {
  if (!splitter || !panelInstance) return
  const curSize = splitter.panelInstances.value[index].sizeRef
  const nextSize = splitter.panelInstances.value[index + 1].sizeRef
  if (curSize.value === undefined || nextSize.value === undefined) return
  if (pos === 'end') {
    curSize.value += nextSize.value ?? 0
    nextSize.value = 0
  } else {
    nextSize.value += curSize.value ?? 0
    curSize.value = 0
  }
}

const hasBar = computed(() => {
  if (!splitter || !panelInstance) return false
  const { index } = panelInstance
  return index !== -1 && index < splitter?.panelInstances.value.length - 1
})

onMounted(() => {
  if (splitter) {
    splitter.registerPanel(panelInstance)
  }
})

onUnmounted(() => {
  if (splitter && panelInstance.index !== undefined) splitter.unregisterPanel(panelInstance.index)
})
</script>
