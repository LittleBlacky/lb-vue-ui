<template>
  <header class="lb-header" :style="headerStyle">
    <slot />
  </header>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { LbHeaderProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils/createNamespace";

defineOptions({
  name: "LbHeader",
});

const props = withDefaults(defineProps<LbHeaderProps>(), {
  height: "60px",
});

const bem = createNamespace("header");

const headerStyle = computed(() => {
  return {
    height: props.height,
  };
});
</script>
