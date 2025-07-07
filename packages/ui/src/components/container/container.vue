
<template>
  <div class="lb-container">
    <!-- LbContainer 组件内容 -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { LbContainerProps } from './types';

defineOptions({
  name: 'LbContainer',
});

const props = defineProps<LbContainerProps>();
</script>
