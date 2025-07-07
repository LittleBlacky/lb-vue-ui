<template>
  <button
    class="lb-button"
    :class="{
      [`lb-button--${type}`]: type,
      [`lb-button--${size}`]: size,
    }"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import type { LbButtonProps } from './types.ts'
withDefaults(defineProps<LbButtonProps>(), {
  type: 'default',
  size: 'medium',
})
</script>
