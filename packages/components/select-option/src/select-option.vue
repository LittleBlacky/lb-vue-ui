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
  if (selectContext.multiple) {
    if (!Array.isArray(selectContext.modelValue.value)) {
      selectContext.modelValue.value = [selectContext.modelValue.value];
    }
    return selectContext?.modelValue?.value?.includes(props.value);
  }
  return selectContext?.modelValue.value === props.value;
});

const handleClick = () => {
  if (!selectContext) return;
  if (selectContext.multiple) {
    if (!Array.isArray(selectContext.modelValue.value)) {
      selectContext.modelValue.value = [selectContext.modelValue.value];
    }
    const index = (selectContext.modelValue.value as LbSelectValue[]).indexOf(
      props.value
    );
    if (index === -1 && !itemSelected.value) {
      selectContext.modelValue.value = [
        ...(selectContext.modelValue.value as LbSelectValue[]),
        props.value,
      ];
    } else {
      selectContext.modelValue.value = (
        selectContext.modelValue.value as LbSelectValue[]
      ).filter((v: LbSelectValue) => v !== props.value);
    }
  } else {
    selectContext.inputRef.value = props.label;
    selectContext.modelValue.value = props.value;
    selectContext.toggleVisible();
  }
};

const classes = computed(() => {
  return [bem.b(), bem.is("selected", itemSelected.value)];
});

const styles = computed(() => {
  return {};
});
</script>
