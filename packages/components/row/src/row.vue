<template>
  <div :class="rowClass" :style="rowStyle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide } from "vue";
import type { LbRowProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

defineOptions({
  name: "LbRow",
});

const props = withDefaults(defineProps<LbRowProps>(), {
  justify: "start",
  align: "top",
});

const bem = createNamespace("row");

const rowClass = computed(() => {
  return [bem.b(), bem.m(props.justify), bem.m(props.align)];
});

const rowStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.gutter) {
    style.marginLeft = `-${props.gutter / 2}px`;
    style.marginRight = `-${props.gutter / 2}px`;
  }
  return style;
});

provide("LbRow", {
  gutter: computed(() => props.gutter),
});
</script>
