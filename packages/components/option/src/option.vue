<template>
  <div :class="classes" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { LbOptionProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("option");

defineOptions({
  name: "LbOption",
});

const props = withDefaults(defineProps<LbOptionProps>(), {});

const classes = computed(() => {
  return [bem.b()];
});

const styles = computed(() => {
  return {};
});
</script>
