<template>
  <div :class="classes">
    <input
      :value="value || label"
      type="radio"
      :checked="model === (value || label)"
      :name="name || radioGroup!.name.value"
      :disabled="disabled"
      :class="[bem.e('original')]"
    />
    <label
      :for="label"
      :class="[bem.e('label')]"
      ref="radioRef"
      @click="model = value || label"
    >
      <span :class="[bem.e('inner')]" />
      <span :class="[bem.e('text')]" v-if="$slots.default || label">
        <slot>{{ label }}</slot>
      </span>
    </label>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, inject } from "vue";
import type { LbRadioProps, LbRadioEmits } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";
import { radioGroupKey } from "../../radio-group/src/types";

const bem = createNamespace("radio");

defineOptions({
  name: "LbRadio",
});

const props = withDefaults(defineProps<LbRadioProps>(), {
  modelValue: null,
  label: "",
  value: "",
  disabled: false,
  name: "",
  size: "base",
});

const emits = defineEmits<LbRadioEmits>();

const radioRef = ref<HTMLInputElement>();

const radioGroup = inject(radioGroupKey);

const isGroup = computed(() => !!radioGroup);

const model = computed({
  get() {
    return isGroup.value ? radioGroup!.modelValue.value : props.modelValue;
  },
  set(val) {
    if (isGroup.value) {
      radioGroup!.change(props.value || props.label);
    } else {
      emits("update:modelValue", val);
    }
  },
});

const isDisabled = computed(() => {
  return isGroup.value
    ? radioGroup!.disabled.value || props.disabled
    : props.disabled;
});

const radioSize = computed(() => {
  return isGroup.value ? radioGroup!.size.value : props.size;
});

const classes = computed(() => {
  return [
    bem.b(),
    bem.is("disabled", isDisabled.value),
    bem.is("checked", model.value === (props.value || props.label)),
    bem.m(radioSize.value),
  ];
});
</script>
