<template>
  <div :class="classes" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { LbLoadingProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils/createNamespace";

const bem = createNamespace("loading");

defineOptions({
  name: "LbLoading",
});

const props = withDefaults(defineProps<LbLoadingProps>(), {});

const classes = computed(() => {
  return [bem.b()];
});

const styles = computed(() => {
  return {};
});
</script>
