<template>
  <div :class="classes" @mousedown="onMousedown" ref="splitterBarRef">
    <div
      :class="[bem.e('collapse'), bem.em('collapse', 'start')]"
      v-if="props.startCollapse"
      @click="emits('collapse', index, 'start')"
    >
      <slot name="before">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
        >
          <path
            d="M48 256c0 114.87 93.13 208 208 208s208-93.13 208-208S370.87 48 256 48S48 141.13 48 256zm252 108.27L169.91 256L300 147.73z"
            fill="currentColor"
          ></path>
        </svg>
      </slot>
    </div>
    <div :class="bem.e('gutter')"></div>
    <div
      :class="[bem.e('collapse'), bem.em('collapse', 'end')]"
      v-if="props.endCollapse"
      @click="emits('collapse', index, 'end')"
    >
      <slot name="after">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
        >
          <path
            d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208s208-93.13 208-208zM212 147.73L342.09 256L212 364.27z"
            fill="currentColor"
          ></path>
        </svg>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LbSplitterBarProps, LbSplitterBarEmits } from './types'
import { computed, onUnmounted, ref } from 'vue'
import { createNamespace } from '@/utils/createNamespace'

defineOptions({
  name: 'LbSplitterBar',
})

const splitterBarRef = ref(null)

const props = withDefaults(defineProps<LbSplitterBarProps>(), {
  direction: 'horizontal',
  resizeabel: false,
  startCollapse: false,
  endCollapse: false,
  index: -1,
})

const emits = defineEmits<LbSplitterBarEmits>()

const bem = createNamespace('splitter-bar')

const classes = computed(() => {
  return [bem.b(), bem.m(props.direction)]
})

let startPos = 0

const onMousemove = (e: MouseEvent) => {
  e.preventDefault()
  if (!props.resizeabel) return
  const movePos = props.direction === 'horizontal' ? e.clientX : e.clientY
  const moveDistance = movePos - startPos
  startPos = movePos
  emits('moving', moveDistance)
}

const onMouseup = (e: MouseEvent) => {
  e.preventDefault()
  if (!props.resizeabel) return
  emits('moveEnd', props.index)
  window.removeEventListener('mousemove', onMousemove)
  window.removeEventListener('mouseup', onMouseup)
}

const onMousedown = (e: MouseEvent) => {
  e.preventDefault()
  if (!props.resizeabel) return
  emits('moveStart', props.index)
  startPos = props.direction === 'horizontal' ? e.clientX : e.clientY
  window.addEventListener('mousemove', onMousemove)
  window.addEventListener('mouseup', onMouseup)
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onMousemove)
  window.removeEventListener('mouseup', onMouseup)
})
</script>
