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
  props,
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
  sizeModel.value = Math.max(props.minSize, Math.min(props.maxSize, size))
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
  return nextSize > 0 && nextInstance.props.resizeabel && splitter?.isDragging
})

watch(sizeModel, (newVal) => {
  if (newVal === undefined) return
  emits('update:size', newVal)
})

const onMoving = (distance: number) => {
  if (!splitter?.isDragging || !props.resizeabel) return
  const curSize = sizeModel.value as number
  const curMaxSize = props.maxSize
  const curMinSize = props.minSize
  const curInstance = panelInstance
  const nextInstance = splitter.panelInstances.value[curInstance.index + 1]
  const nextSize = nextInstance.sizeRef.value as number
  const nextMaxSize = nextInstance.props.maxSize as number
  const nextMinSize = nextInstance.props.minSize as number
  const totalSize = curSize + nextSize
  let curNewSize = curSize + distance
  let nextNewSize = totalSize - curNewSize

  // 计算当前面板和相邻面板的合法调整范围
  const effectiveMin = Math.max(curMinSize, totalSize - nextMaxSize)
  const effectiveMax = Math.min(curMaxSize, totalSize - nextMinSize)

  // 检查是否存在有效范围
  if (effectiveMin > effectiveMax) {
    throw new Error('[lb-splitter-panel]: 无法同时满足两个面板的min/max约束，请检查尺寸配置。')
  }

  // 在当前面板的范围内调整尺寸
  const adjustedSize = Math.max(effectiveMin, Math.min(effectiveMax, curNewSize))

  // 当且仅当实际调整幅度超过系统容差时更新尺寸
  const tolerance = 1 // 容差值，避免无意义的微调
  if (Math.abs(adjustedSize - curNewSize) > tolerance) {
    curNewSize = adjustedSize
    nextNewSize = totalSize - curNewSize
  }

  if (curNewSize + nextNewSize !== totalSize) return
  sizeModel.value = curNewSize
  nextInstance.sizeRef.value = nextNewSize
}

const onCollapse = (index: number, pos: string) => {
  if (!splitter?.isDragging || !panelInstance) return
  const {
    sizeRef: curSize,
    props: { minSize: curMinSize = 0, maxSize: curMaxSize = Infinity },
  } = splitter.panelInstances.value[index]
  const {
    sizeRef: nextSize,
    props: { minSize: nextMinSize = 0, maxSize: nextMaxSize = Infinity },
  } = splitter.panelInstances.value[index + 1]
  if (curSize.value === undefined || nextSize.value === undefined) return
  if (pos === 'end') {
    let delta = nextSize.value - nextMinSize
    if (curSize.value + delta > curMaxSize) {
      delta = curMaxSize - curSize.value
      curSize.value = curMaxSize
      nextSize.value -= delta
      if (nextSize.value < nextMinSize) {
        throw new Error('[lb-splitter-panel]: 无法同时满足两个面板的min/max约束，请检查尺寸配置。')
      }
      return
    }
    curSize.value += delta
    nextSize.value -= delta
  } else {
    let delta = curSize.value - curMinSize
    if (nextSize.value + delta > nextMaxSize) {
      delta = nextMaxSize - nextSize.value
      nextSize.value = nextMaxSize
      curSize.value -= delta
      if (curSize.value < curMinSize) {
        throw new Error('[lb-splitter-panel]: 无法同时满足两个面板的min/max约束，请检查尺寸配置。')
      }
      return
    }
    curSize.value -= delta
    nextSize.value += delta
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
