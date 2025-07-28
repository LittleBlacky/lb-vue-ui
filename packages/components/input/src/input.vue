<template>
  <input :class="classes" :style="styles" />
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { LbInputProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils/createNamespace";

const bem = createNamespace("input");

defineOptions({
  name: "LbInput",
});

const props = withDefaults(defineProps<LbInputProps>(), {});

const classes = computed(() => {
  return [bem.b()];
});

const styles = computed(() => {
  return {};
});
</script>
