<template>
  <li
    :class="classes"
    :style="styles"
    @click.stop="handleClick"
    :aria-selected="itemSelected"
    role="option"
  >
    <slot>
      <span>{{ label }}</span>
    </slot>
  </li>
</template>
<script setup lang="ts">
import { computed, inject } from "vue";
import type { LbSelectOptionProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";
import {
  LbSelectSymbol,
  type LbSelectInject,
  type LbSelectValue,
} from "@lb-vue-ui/components";
const bem = createNamespace("select__option");

defineOptions({
  name: "LbSelectOption",
});

const props = withDefaults(defineProps<LbSelectOptionProps>(), {
  label: "",
  value: "",
});

const selectContext = inject<LbSelectInject>(LbSelectSymbol);

const itemSelected = computed(() => {
  if (!selectContext) return false;

  const { modelValue, multiple, valueKey } = selectContext;
  const currentValue = modelValue.value;

  if (multiple) {
    const values = Array.isArray(currentValue) ? currentValue : [currentValue];
    return values.some((v: LbSelectValue) => {
      return typeof v === "object" && v !== null && valueKey in v
        ? (v as Record<string, any>)[valueKey] === props.value
        : v === props.value;
    });
  }

  return currentValue === props.value;
});

const handleClick = () => {
  if (!selectContext) return;

  const { modelValue, multiple, valueKey, inputRef, toggleVisible } =
    selectContext;
  const currentValue = modelValue.value;

  if (multiple) {
    const values = Array.isArray(currentValue) ? currentValue : [currentValue];
    const index = values.indexOf(props.value);

    modelValue.value =
      index === -1 && !itemSelected.value
        ? [...values, props.value]
        : values.filter((v) => v !== props.value);
  } else {
    if (props.value && typeof props.value === "object") {
      inputRef.value = valueKey ? props.value[valueKey] : props.value;
    }
    modelValue.value = props.value;
    toggleVisible();
  }
};

const classes = computed(() => {
  return [bem.b(), bem.is("selected", itemSelected.value)];
});

const styles = computed(() => {
  return {};
});
</script>
