<template>
  <div
    :class="[bem.b(), bem.is('disabled', disabled)]"
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
      <div :class="[bem.e('wrapper')]">
        <template v-if="props.multiple">
          <slot name="tag" :selectedLabels="modelLabel">
            <lb-tag
              v-for="(item, index) in modelLabel"
              :class="bem.e('selected-item')"
              :key="modelValue[index]"
              type="info"
              closable
              @close="handleDelete(index)"
            >
              {{ item }}
            </lb-tag>
          </slot>
        </template>
        <input
          ref="inputRef"
          v-model="inputModel"
          :readonly="inputReadonly"
          :disabled="disabled"
          :class="[bem.e('input')]"
        />
      </div>
      <template #content>
        <ul :class="[bem.e('dropdown-menu')]" :style="dropdownStyle">
          <slot>
            <template v-if="options">
              <lb-select-option
                v-for="item in options"
                :key="
                  valueKey
                    ? (item.value as Record<string, any>)[valueKey]
                    : item.value
                "
                :label="item[props.props.label]"
                :value="item[props.props.value]"
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
import { ref, provide, computed, onMounted } from "vue";
import { createNamespace } from "@lb-vue-ui/utils";
import type { LbSelectProps, LbSelectEmits, LbSelectValue } from "./types";
import {
  LbTooltip,
  LbTag,
  LbSelectSymbol,
  LbSelectOption,
  type LbSelectOptionItem,
} from "@lb-vue-ui/components";

defineOptions({
  name: "LbSelect",
});

const bem = createNamespace("select");

const props = withDefaults(defineProps<LbSelectProps>(), {
  modelValue: null,
  placeholder: "请选择",
  disabled: false,
  props: () => ({
    label: "label",
    value: "value",
  }),
  placement: "bottom-start",
  offset: 9,
  multiple: false,
  visible: false,
  valueKey: "value",
  size: "base",
});

const appendTo = computed(() => document.body);

const inputModel = ref<Omit<LbSelectValue, "object">>("");
const inputRef = ref();
const inputReadonly = computed(() => !(props.filterable || props.multiple));
const disabled = computed(() => props.disabled || props.loading);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits("update:modelValue", value);
    emits("change", value);
  },
});

const modelLabel = computed(() => {
  const curValue = Array.isArray(modelValue.value)
    ? [...modelValue.value]
    : [modelValue.value];

  const curLabel = curValue.map((v) => {
    const item = selectOptions.value.find((item) => {
      if (typeof item.value === "object" && props.valueKey) {
        // @ts-ignore
        return item.value[props.valueKey] === v[props.valueKey];
      }
      return item.value === v;
    });
    return item?.label || "";
  });
  if (!props.multiple) {
    inputModel.value = curLabel[0] || "";
  }
  return curLabel;
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

const handleDelete = (index: number) => {
  if (Array.isArray(modelValue.value)) {
    modelValue.value.splice(index, 1);
  }
};

const selectOptions = ref<LbSelectOptionItem[]>([]);

provide(LbSelectSymbol, {
  valueKey: props.valueKey,
  modelValue,
  props: props.props,
  multiple: props.multiple,
  selectOptions,
  toggleVisible,
});

onMounted(() => {
  inputRef.value.addEventListener("keydown", function (event: KeyboardEvent) {
    if (!props.multiple) return;
    if (event.key !== "Backspace" && event.key !== "Delete") return;
    if (inputModel.value !== "") return;
    Array.isArray(modelValue.value) &&
      modelValue.value.length > 0 &&
      modelValue.value.pop();
  });
});

defineExpose({
  inputRef,
});
</script>

<style lang="scss" scoped></style>
