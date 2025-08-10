<template>
  <div :class="classes" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { LbRadioProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("radio");

defineOptions({
  name: "LbRadio",
});

const props = withDefaults(defineProps<LbRadioProps>(), {});

const classes = computed(() => {
  return [bem.b()];
});

const styles = computed(() => {
  return {};
});
</script>
