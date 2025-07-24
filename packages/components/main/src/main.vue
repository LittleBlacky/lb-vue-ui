<template>
  <main :class="mainClass">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { createNamespace } from '@/utils/createNamespace';
import type { LbMainProps } from '../index';

defineOptions({
  name: 'LbMain',
});

const bem = createNamespace('main');

const mainClass = computed(() => {
  return [
    bem.b()
  ]
})

</script>