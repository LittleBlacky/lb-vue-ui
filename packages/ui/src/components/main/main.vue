<template>
  <main :class="mainClass">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { createNamespace } from '@/utils/createNamespace';

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