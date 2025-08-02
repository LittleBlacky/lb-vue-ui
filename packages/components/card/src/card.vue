<template>
  <div :class="classes" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { LbCardProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils/createNamespace";

const bem = createNamespace("card");

defineOptions({
  name: "LbCard",
});

const props = withDefaults(defineProps<LbCardProps>(), {});

const classes = computed(() => {
  return [bem.b()];
});

const styles = computed(() => {
  return {};
});
</script>
