<template>
  <div ref="splitterRef" :class="classes">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, provide, ref, type ShallowReactive, watch } from 'vue'
import { createNamespace } from '@/utils/createNamespace'
import { type LbSplitterProps, type LbSplitterEmits, LbSplitterContextKey } from './types'
import { type LbSplitterPanelInstance } from '../splitter-panel/types'
import { withDefaults, defineEmits } from 'vue'

defineOptions({
  name: 'LbSplitter',
})

const props = withDefaults(defineProps<LbSplitterProps>(), {
  direction: 'horizontal',
  dragging: true,
})

const emit = defineEmits<LbSplitterEmits>()

const bem = createNamespace('splitter')

const splitterRef = ref<HTMLDivElement>()

const panelInstances = ref<ShallowReactive<LbSplitterPanelInstance>[]>([])
const splitterSize = ref(0)
watch([panelInstances, splitterSize], () => {
  const panelCount = panelInstances.value.length
  const emptyPanels: number[] = []
  let total = 0
  for (let i = 0; i < panelCount; ++i) {
    let size: number | undefined = panelInstances.value[i].sizeRef.value
    if (size || size === 0) {
      const num = Number(size)
      if (!isNaN(num)) {
        size = num
      }
    } else {
      emptyPanels.push(i)
      size = undefined
    }
    total += size ?? 0
  }
  if (total > splitterSize.value || !emptyPanels.length) {
    panelInstances.value.forEach((panel) => {
      panel.sizeRef.value = ((panel.sizeRef.value ?? 0) / total) * splitterSize.value
    })
  } else {
    const leftSize = splitterSize.value - total
    emptyPanels.forEach((panel) => {
      panelInstances.value[panel].sizeRef.value = leftSize / emptyPanels.length
    })
  }
})

const registerPanel = (instance: ShallowReactive<LbSplitterPanelInstance>) => {
  panelInstances.value.push(instance)
  instance.index = panelInstances.value.length - 1
}

const unregisterPanel = (index: number) => {
  panelInstances.value.splice(index, 1)
  for (let i = index; i < panelInstances.value.length; ++i) --panelInstances.value[i].index
}

const panelTotalSize = computed(() => {
  return panelInstances.value.reduce((acc, cur) => acc + (cur.sizeRef.value ?? 0), 0)
})

provide(LbSplitterContextKey, {
  props,
  emit,
  isDragging: props.dragging,
  splitterSize,
  panelTotalSize,
  panelInstances,
  registerPanel,
  unregisterPanel,
})

const onResize = () => {
  splitterSize.value =
    props.direction === 'horizontal'
      ? (splitterRef.value?.offsetWidth ?? 0)
      : (splitterRef.value?.offsetHeight ?? 0)
}

onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  panelInstances.value = []
})

const classes = computed(() => [
  bem.b(),
  bem.m(props.direction),
  bem.is('dragging', props.dragging),
])
</script>
