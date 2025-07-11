<template>
  <button
    :class="buttonClass"
    :disabled="disabled || loading"
  >
    <template v-if="loading">
      <LbIcon spin><Sync /></LbIcon>
    </template>
    <template v-else-if="$slots.icon">
      <slot name="icon"></slot>
    </template>
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { LbButtonProps } from './types.ts'
import { createNamespace } from '@/utils/createNamespace'
import { Sync } from '@vicons/ionicons5'
import LbIcon from '../icon/icon.vue'

const bem = createNamespace('button')

defineOptions({
  name: 'LbButton'
})
const props = withDefaults(defineProps<LbButtonProps>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
  round: false,
  circle: false,
  loading: false,
  plain: false,
  text: false,
  link: false,
})

const buttonClass = computed(() => {
  return [
    bem.b(),
    bem.is('disabled', props.disabled),
    bem.is('round', props.round),
    bem.is('circle', props.circle),
    bem.is('loading', props.loading),
    bem.is('plain', props.plain),
    bem.is('text', props.text),
    bem.is('link', props.link),
    bem.m(props.type),
    bem.m(props.size),
  ]
})
</script>
