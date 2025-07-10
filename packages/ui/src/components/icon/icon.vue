<template>
  <i class="lb-icon" :style="style">
    <!-- LbIcon 组件内容 -->
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import type { LbIconProps } from './types';
import { computed } from 'vue';
import { createNamespace } from '@/utils/createNamespace';
defineOptions({
  name: 'LbIcon',
});
const bem = createNamespace('icon');
const props = defineProps<LbIconProps>();
const style = computed(() => {
  return {
    ...(props.size ? { fontSize: props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
})
const className = computed(() => ([
  bem.b()
]))
</script>
