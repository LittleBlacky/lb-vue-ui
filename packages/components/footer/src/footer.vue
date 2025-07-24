<template>
  <footer :class="footerClass" :style="footerStyle">
    <slot />
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { LbFooterProps } from './types';
import { createNamespace } from '@lb-vue-ui/utils/createNamespace';

defineOptions({
  name: 'LbFooter',
});

const props = withDefaults(defineProps<LbFooterProps>(), {
  height: '60px',
});

const bem = createNamespace('footer');

const footerClass = computed(() => {
    return [
        bem.b(),
    ]
})

const footerStyle = computed(() => {
  return {
    height: props.height,
  };
});
</script>