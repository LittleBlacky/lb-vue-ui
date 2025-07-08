<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { LbButtonProps } from './types.ts'
import { createNamespace } from '@/utils/createNamespace'

const bem = createNamespace('button')

defineOptions({
  name: 'LbButton'
})
const props = withDefaults(defineProps<LbButtonProps>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
})

const buttonClass = computed(() => {
  return [
    bem.b(),
    bem.m(props.type),
    bem.m(props.size),
    bem.is('disabled', props.disabled)
  ]
})
</script>
