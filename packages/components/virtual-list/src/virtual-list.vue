<template>
  <div class="lb-virtual-list">
    <div class="lb-virtual-list__container" ref="containerRef" @scroll="handleScroll">
      <div class="lb-virtual-list__phantom" :style="{ height: phantomHeight + 'px' }"></div>
      <div class="lb-virtual-list__content" :style="{ transform: `translateY(${offsetY}px)` }">
        <div
          v-for="item in visibleData"
          :key="item.id"
          :style="{ height: itemSize + 'px' }"
          class="lb-virtual-list__item"
        >
          <slot :item="item.data"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { createNamespace } from '@lb-vue-ui/utils/createNamespace'
import type { LbVirtualListProps } from './types'

defineOptions({
  name: 'LbVirtualList',
})

const props = withDefaults(
  defineProps<{
    data: any[]
    itemSize: number
  }>(),
  {
    data: () => [],
    itemSize: 50,
  },
)

const bem = createNamespace('virtual-list')

const containerRef = ref<HTMLElement | null>(null)
const offsetY = ref(0)
const startIndex = ref(0)
const endIndex = ref(0)

const visibleCount = computed(() => {
  if (!containerRef.value) return 0
  return Math.ceil(containerRef.value.clientHeight / props.itemSize) + 2
})

const phantomHeight = computed(() => props.data.length * props.itemSize)

const visibleData = computed(() => {
  const start = startIndex.value
  const end = Math.min(endIndex.value, props.data.length)
  return props.data.slice(start, end).map((data, index) => ({
    id: start + index,
    data,
  }))
})

const updateVisibleRange = () => {
  if (!containerRef.value) return
  const scrollTop = containerRef.value.scrollTop
  startIndex.value = Math.floor(scrollTop / props.itemSize)
  endIndex.value = startIndex.value + visibleCount.value
  offsetY.value = startIndex.value * props.itemSize
}

const handleScroll = () => {
  updateVisibleRange()
}

onMounted(() => {
  updateVisibleRange()
})

watch(
  () => props.data,
  () => {
    updateVisibleRange()
  },
  { deep: true },
)
</script>
