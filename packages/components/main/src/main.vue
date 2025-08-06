<template>
  <main :class="mainClass">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { createNamespace } from "@lb-vue-ui/utils";

defineOptions({
  name: "LbMain",
});

const bem = createNamespace("main");

const mainClass = computed(() => {
  return [bem.b()];
});
</script>
