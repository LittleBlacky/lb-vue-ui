<template>
  <aside :class="asideClass" :style="asideStyle">
    <slot />
  </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { LbAsideProps } from './types';
import { createNamespace } from '@/utils/createNamespace';

defineOptions({
  name: 'LbAside',
});

const props = withDefaults(defineProps<LbAsideProps>(), {
  width: '300px',
});

const bem = createNamespace('aside');

const asideClass = computed(() => {
  return [
    bem.b(),
  ] 
})

const asideStyle = computed(() => {
  return {
    width: props.width,
  };
});
</script>