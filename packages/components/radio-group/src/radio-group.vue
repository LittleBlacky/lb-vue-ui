<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed, provide } from "vue";
import type { LbRadioGroupProps, LbRadioGroupEmits } from "./types";
import { radioGroupKey } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("radio-group");

defineOptions({
  name: "LbRadioGroup",
});

const props = withDefaults(defineProps<LbRadioGroupProps>(), {
  modelValue: null,
  name: "",
  size: "base",
  disabled: false,
});

const emits = defineEmits<LbRadioGroupEmits>();

const handleRadioChange = (value: string | number | boolean | null) => {
  emits("update:modelValue", value);
  emits("change", value);
};

provide(radioGroupKey, {
  name: computed(() => props.name),
  modelValue: computed(() => props.modelValue ?? ""),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  change: handleRadioChange,
});

const classes = computed(() => {
  return [bem.b(), bem.m(props.size), bem.is("disabled", props.disabled)];
});

const styles = computed(() => {
  return {};
});
</script>
