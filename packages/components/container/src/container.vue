<template>
  <section :class="containerClass">
    <slot />
  </section>
</template>

<script lang="ts" setup>
import { computed, useSlots, type Component } from "vue";
import type { LbContainerProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils/createNamespace";

defineOptions({
  name: "LbContainer",
});

const props = defineProps<LbContainerProps>();

const slots = useSlots();

const bem = createNamespace("container");

const isVertical = computed(() => {
  if (props.direction === "vertical") return true;
  if (props.direction === "horizontal") return false;
  if (slots && slots.default) {
    const vNodes = slots.default();
    return vNodes.some((vNode) => {
      const tag = (vNode.type as Component).name;
      return tag === "LbHeader" || tag === "LbFooter";
    });
  }
  return false;
});

const containerClass = computed(() => {
  return [bem.b(), bem.is("vertical", isVertical.value)];
});
</script>
