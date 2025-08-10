<template>
  <div :class="classes" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { LbRadioGroupProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("radio-group");

defineOptions({
  name: "LbRadioGroup",
});

const props = withDefaults(defineProps<LbRadioGroupProps>(), {});

const classes = computed(() => {
  return [bem.b()];
});

const styles = computed(() => {
  return {};
});
</script>
