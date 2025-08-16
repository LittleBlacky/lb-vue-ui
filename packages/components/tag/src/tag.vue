<template>
  <Transition name="lb-zoom-in-center" appear>
    <div :class="classes" :style="styles" v-if="visible" v-bind="$attrs">
      <span :class="bem.e('content')">
        <slot></slot>
      </span>
      <lb-icon
        v-if="closable"
        :class="bem.e('close')"
        name="close"
        @click="handleClose"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
        >
          <path
            d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256z"
            fill="currentColor"
          ></path>
        </svg>
      </lb-icon>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import type { LbTagEmits, LbTagProps } from "./types";
import LbIcon from "../../icon";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("tag");

defineOptions({
  name: "LbTag",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<LbTagProps>(), {
  type: "primary",
  size: "base",
  hit: true,
  closable: false,
  disableTransitions: false,
  color: "",
  effect: "light",
});

const emits = defineEmits<LbTagEmits>();

const classes = computed(() => {
  return [
    bem.b(),
    props.type ? bem.m(props.type) : "",
    props.size ? bem.m(props.size) : "",
    props.hit && bem.is("hit"),
    props.closable && bem.is("closable"),
    props.disableTransitions && bem.is("disable-transitions"),
    bem.m(props.effect),
  ];
});

const styles = computed(() => {
  return {
    backgroundColor: props.color || "",
  };
});

const visible = ref(true);

const handleClose = (e: MouseEvent) => {
  visible.value = !visible.value;
  if (!visible.value) emits("close", e);
};
</script>
