<template>
  <i :class="className" :style="style">
    <!-- LbIcon 组件内容 -->
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import type { LbIconProps } from "./types";
import { computed } from "vue";
import { createNamespace } from "@lb-vue-ui/utils";

defineOptions({
  name: "LbIcon",
});
const bem = createNamespace("icon");
const props = withDefaults(defineProps<LbIconProps>(), {
  size: "1rem",
});
const style = computed(() => {
  let { size, color } = props;
  if (typeof size === "number") {
    size = size + "px";
  }
  return {
    ...(size ? { fontSize: size } : {}),
    ...(color ? { color: color } : {}),
  };
});
const className = computed(() => [
  bem.b(),
  bem.is("spin", props.spin),
  bem.is("reverse", props.reverse),
]);
</script>
