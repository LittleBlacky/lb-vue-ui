<template>
  <div :class="classes" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { LbFormItemProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("form-item");

defineOptions({
  name: "LbFormItem",
});

const props = withDefaults(defineProps<LbFormItemProps>(), {});

const classes = computed(() => {
  return [bem.b()];
});

const styles = computed(() => {
  return {};
});
</script>
