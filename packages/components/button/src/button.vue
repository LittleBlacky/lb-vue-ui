<template>
  <button :class="buttonClass" :disabled="disabled || loading">
    <template v-if="loading">
      <LbIcon spin>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
        >
          <path
            d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 0 0-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 0 0 140-66.92"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          ></path>
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M32 256l44-44l46 44"
          ></path>
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M480 256l-44 44l-46-44"
          ></path>
        </svg>
      </LbIcon>
    </template>
    <template v-else-if="$slots.icon">
      <slot name="icon"></slot>
    </template>
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { LbButtonProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";
import LbIcon from "../../icon/src/icon.vue";

const bem = createNamespace("button");

defineOptions({
  name: "LbButton",
});
const props = withDefaults(defineProps<LbButtonProps>(), {
  type: "default",
  size: "medium",
  disabled: false,
  round: false,
  circle: false,
  loading: false,
  plain: false,
  text: false,
  link: false,
});

const buttonClass = computed(() => {
  return [
    bem.b(),
    bem.is("disabled", props.disabled),
    bem.is("round", props.round),
    bem.is("circle", props.circle),
    bem.is("loading", props.loading),
    bem.is("plain", props.plain),
    bem.is("text", props.text),
    bem.is("link", props.link),
    bem.m(props.type),
    bem.m(props.size),
  ];
});
</script>
