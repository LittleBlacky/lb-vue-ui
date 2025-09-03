<template>
  <li
    v-show="visible"
    :class="classes"
    :style="styles"
    @click.stop="handleClick"
    :aria-selected="itemSelected"
    role="option"
    v-ripple="{ disabled: props.disabled }"
  >
    <slot>
      <span>{{ label }}</span>
    </slot>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue";
import type { LbSelectOptionProps } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";
import {
  LbSelectSymbol,
  type LbSelectInject,
  type LbSelectValue,
} from "@lb-vue-ui/components";
import { Ripple } from "@lb-vue-ui/directives";
const vRipple = Ripple;
const bem = createNamespace("select__option");

defineOptions({
  name: "LbSelectOption",
});

const props = withDefaults(defineProps<LbSelectOptionProps>(), {
  label: "",
  value: "",
  disabled: false,
});

const selectContext = inject<LbSelectInject>(LbSelectSymbol);
const visible = ref(true);

const itemSelected = computed(() => {
  if (!selectContext) return false;
  const { valueKey, modelValue } = selectContext;
  const values = Array.isArray(modelValue.value)
    ? modelValue.value
    : [modelValue.value];
  return values.some((v: LbSelectValue) => {
    if (typeof props.value === "object") {
      return (v as Record<string, any>)[valueKey] === props.value[valueKey];
    }
    return v === props.value;
  });
});

const handleClick = () => {
  if (!selectContext) return;
  const { multiple, modelValue, toggleVisible } = selectContext;
  if (multiple) {
    const values = Array.isArray(modelValue.value)
      ? modelValue.value
      : [modelValue.value];
    if (itemSelected.value) {
      if (typeof props.value === "object") {
        values.splice(values.indexOf(props.value[valueKey]), 1);
      } else {
        values.splice(values.indexOf(props.value), 1);
      }
    } else {
      values.push(props.value);
    }
    modelValue.value = values;
  } else {
    if (itemSelected.value) {
      modelValue.value = null;
    } else {
      modelValue.value = props.value;
    }
    toggleVisible();
  }
};

const classes = computed(() => {
  return [
    bem.b(),
    bem.is("selected", itemSelected.value),
    bem.is("hidden", !visible.value),
  ];
});

const styles = computed(() => {
  return {};
});

onMounted(() => {
  if (selectContext) {
    const { selectOptions } = selectContext;
    selectOptions.value.push({
      label: props.label,
      value: props.value,
      visible: visible,
    });
  }
});

onBeforeUnmount(() => {
  if (selectContext) {
    selectContext.selectOptions.value =
      selectContext.selectOptions.value.filter((v) => v.value !== props.value);
  }
});
</script>

<style lang="scss">
.lb-select__option {
  &.is-hidden {
    display: none;
  }
}
</style>
