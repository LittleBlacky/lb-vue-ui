<template>
  <div
    :class="(bem.b(), bem.is('disabled', disabled))"
    @click="toggleVisible"
    ref="selectRef"
  >
    <lb-tooltip
      v-model:visible="visibleRef"
      :placement="props.placement"
      :offset="props.offset"
      :disabled="disabled"
      trigger="click"
      content="暂无数据"
      :popper-class="bem.e('dropdown-wrapper')"
      :append-to="appendTo"
    >
      <lb-input
        v-model="inputRef"
        :readonly="readonly"
        :size="props.size"
        :disabled="disabled"
        :class="[bem.e('input'), bem.is('filterable', props.filterable)]"
      >
      </lb-input>
      <template #content>
        <ul :class="[bem.e('dropdown-menu')]" :style="dropdownStyle">
          <slot>
            <template v-if="options">
              <lb-select-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </lb-select-option>
            </template>
          </slot>
        </ul>
      </template>
    </lb-tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref, provide, computed } from "vue";
import { createNamespace } from "@lb-vue-ui/utils";
import type { LbSelectProps, LbSelectEmits } from "./types";
import { LbTooltip, LbInput, LbSelectSymbol } from "@lb-vue-ui/components";
defineOptions({
  name: "LbSelect",
});

const bem = createNamespace("select");

const props = withDefaults(defineProps<LbSelectProps>(), {
  modelValue: null,
  placeholder: "请选择",
  disabled: false,
  placement: "bottom-start",
  offset: 9,
  multiple: false,
  visible: false,
  size: "base",
});

const appendTo = computed(() => document.body);

const inputRef = ref<string | null>(null);
const readonly = computed(() => !props.filterable);
const disabled = computed(() => props.disabled || props.loading);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits("update:modelValue", value);
    emits("change", value);
  },
});

const toggleVisible = () => {
  if (props.disabled) return;
  visibleRef.value = !visibleRef.value;
};

const emits = defineEmits<LbSelectEmits>();

const selectRef = ref<HTMLElement>();
const visibleRef = ref(false);

const dropdownStyle = computed(() => {
  if (!selectRef.value) return {};
  const rect = selectRef.value.getBoundingClientRect();
  return {
    width: `${rect.width}px`,
  };
});

provide(LbSelectSymbol, {
  inputRef,
  ...props,
  modelValue,
  toggleVisible,
});
</script>

<style lang="scss" scoped></style>
