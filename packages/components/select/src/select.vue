<template>
  <div :class="classes" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { LbSelectProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("select");

defineOptions({
  name: "LbSelect",
});

const props = withDefaults(defineProps<LbSelectProps>(), {});

const classes = computed(() => {
  return [bem.b()];
});

const styles = computed(() => {
  return {};
});
</script>
