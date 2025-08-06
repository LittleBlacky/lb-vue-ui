<template>
  <div :class="classes" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { LbFormProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("form");

defineOptions({
  name: "LbForm",
});

const props = withDefaults(defineProps<LbFormProps>(), {});

const classes = computed(() => {
  return [bem.b()];
});

const styles = computed(() => {
  return {};
});
</script>
