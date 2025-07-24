<template>
  <div :class="colClass" :style="colStyle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";
import type { LbColProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils/createNamespace";

defineOptions({
  name: "LbCol",
});

const props = withDefaults(defineProps<LbColProps>(), {
  span: 24,
  offset: 0,
  pull: 0,
  push: 0,
});

const bem = createNamespace("col");

const { gutter } = inject("LbRow", { gutter: computed(() => 0) });

const colClass = computed(() => {
  const classList: string[] = [
    bem.b(),
    bem.m(String(props.span)),
    props.offset ? bem.m(`offset-${props.offset}`) : "",
    props.pull ? bem.m(`pull-${props.pull}`) : "",
    props.push ? bem.m(`push-${props.push}`) : "",
  ];

  ["xs", "sm", "md", "lg", "xl"].forEach((size) => {
    const sizeProp = props[size as keyof LbColProps];
    if (typeof sizeProp === "number") {
      classList.push(bem.m(`${size}-${sizeProp}`));
    } else if (typeof sizeProp === "object") {
      if (sizeProp.span) classList.push(bem.m(`${size}-${sizeProp.span}`));
      if (sizeProp.offset)
        classList.push(bem.m(`${size}-offset-${sizeProp.offset}`));
      if (sizeProp.pull) classList.push(bem.m(`${size}-pull-${sizeProp.pull}`));
      if (sizeProp.push) classList.push(bem.m(`${size}-push-${sizeProp.push}`));
    }
  });

  return classList;
});

const colStyle = computed(() => {
  const style: Record<string, string> = {};
  if (gutter.value) {
    style.paddingLeft = `${gutter.value / 2}px`;
    style.paddingRight = `${gutter.value / 2}px`;
  }
  return style;
});
</script>
