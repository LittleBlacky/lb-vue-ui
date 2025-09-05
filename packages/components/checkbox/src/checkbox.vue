<template>
  <div :class="classes">
    <input
      type="checkbox"
      :value="value || label"
      :checked="isChecked"
      :name="name || checkboxGroup?.name.value"
      :disabled="isDisabled"
      :class="[bem.e('original')]"
      @change="onNativeChange"
      ref="checkboxRef"
    />
    <label
      :for="String(label)"
      :class="[bem.e('label')]"
      @click.prevent="onLabelClick"
    >
      <span :class="[bem.e('inner'), bem.is('indeterminate', indeterminate)]" />
      <span :class="[bem.e('text')]" v-if="$slots.default || label">
        <slot>{{ label }}</slot>
      </span>
    </label>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, ref } from "vue";
import type { LbCheckboxProps, LbCheckboxEmits } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";
import { checkboxGroupKey } from "../../checkbox-group/src/types";

const bem = createNamespace("checkbox");

defineOptions({
  name: "LbCheckbox",
});

const props = withDefaults(defineProps<LbCheckboxProps>(), {
  modelValue: null,
  label: "",
  value: "",
  disabled: false,
  indeterminate: false,
  name: "",
  size: "base",
});

const emits = defineEmits<LbCheckboxEmits>();

const checkboxGroup = inject(checkboxGroupKey, undefined);
const isGroup = computed(() => !!checkboxGroup);

const checkboxRef = ref<HTMLInputElement>();

const isDisabled = computed(() => {
  return isGroup.value
    ? checkboxGroup!.disabled.value || props.disabled
    : props.disabled;
});

const checkboxSize = computed(() => {
  return isGroup.value ? checkboxGroup!.size.value : props.size;
});

const isChecked = computed(() => {
  if (isGroup.value) {
    const list = checkboxGroup!.modelValue.value || [];
    const val = props.value ?? props.label;
    return list.includes(val as any);
  }
  return !!props.modelValue;
});

const onNativeChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const checked = target.checked;
  if (isGroup.value) {
    const val = props.value ?? props.label;
    checkboxGroup!.change(val as any, checked);
  } else {
    emits("update:modelValue", checked);
    emits("change", checked);
  }
};

const onLabelClick = () => {
  if (isDisabled.value) return;
  const next = !isChecked.value;
  if (isGroup.value) {
    const val = props.value ?? props.label;
    checkboxGroup!.change(val as any, next);
  } else {
    emits("update:modelValue", next);
    emits("change", next);
  }
};

const classes = computed(() => {
  return [
    bem.b(),
    bem.is("disabled", isDisabled.value),
    bem.is("checked", isChecked.value),
    bem.is("indeterminate", props.indeterminate),
    bem.m(checkboxSize.value),
  ];
});
</script>
