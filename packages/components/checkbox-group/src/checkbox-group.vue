<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed, provide } from "vue";
import type { LbCheckboxGroupProps, LbCheckboxGroupEmits } from "./types";
import { checkboxGroupKey } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("checkbox-group");

defineOptions({
  name: "LbCheckboxGroup",
});

const props = withDefaults(defineProps<LbCheckboxGroupProps>(), {
  modelValue: () => [],
  name: "",
  size: "base",
  disabled: false,
});

const emits = defineEmits<LbCheckboxGroupEmits>();

const handleCheckboxChange = (
  value: string | number | boolean,
  checked: boolean
) => {
  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
  const idx = current.findIndex((v) => v === value);
  if (checked && idx === -1) current.push(value);
  if (!checked && idx > -1) current.splice(idx, 1);
  emits("update:modelValue", current);
  emits("change", current);
};

provide(checkboxGroupKey, {
  name: computed(() => props.name),
  modelValue: computed(() => props.modelValue || []),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  change: handleCheckboxChange,
});

const classes = computed(() => {
  return [bem.b(), bem.m(props.size), bem.is("disabled", props.disabled)];
});
</script>
