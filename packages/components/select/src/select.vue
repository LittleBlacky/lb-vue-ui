<template>
  <div
    :class="[bem.b(), bem.is('disabled', disabled), bem.m(size)]"
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
      :append-to="appendTo"
      :popper-class="bem.e('dropdown-wrapper')"
      transition="lb-zoom-in-top"
    >
      <div :class="[bem.e('wrapper')]">
        <div :class="[bem.e('input-wrapper')]">
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
            :placeholder="placeholder"
            @input="OnInput"
          />
        </div>
        <div :class="[bem.e('suffix')]">
          <lb-icon
            name="arrow-down"
            size="12"
            :reverse="!disabled && visibleRef"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 184l144 144l144-144"
              ></path>
            </svg>
          </lb-icon>
          <lb-icon
            v-if="props.multiple && modelValue.length"
            name="clear"
            size="12"
            @click.stop="clear"
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
          <li v-if="!hasVisibleOptions" :class="bem.m('no-data')">
            <slot name="no-data"> 无匹配数据: "{{ inputModel }}" </slot>
          </li>
        </ul>
      </template>
    </lb-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed, onMounted, watch } from "vue";
import { createNamespace } from "@lb-vue-ui/utils";
import { LbIcon } from "@lb-vue-ui/components";
import type { LbSelectProps, LbSelectEmits } from "./types";
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
  disabled: false,
  props: () => ({
    label: "label",
    value: "value",
  }),
  placement: "bottom-start",
  offset: 9,
  multiple: false,
  visible: false,
  filterable: false,
  filterMethod: undefined,
  valueKey: "value",
  size: "base",
  appendTo: "body",
  noDataText: "暂无数据",
});

const placeholder = computed(() => {
  if (props.filterable && !props.multiple && modelLabel.value[0])
    return modelLabel.value[0];
  if (props.placeholder) return props.placeholder;
});

const inputModel = ref<string>("");
const inputRef = ref();
const inputReadonly = computed(() => !props.filterable);
const disabled = computed(() => props.disabled || props.loading);

const toggleVisible = () => {
  if (disabled.value) return;
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

const filterOptions = () => {
  if (!props.filterable || !inputModel.value) {
    selectOptions.value.forEach((option) => {
      option.visible = true;
    });
    return;
  }

  const searchText = inputModel.value.toLowerCase();

  selectOptions.value.forEach((option) => {
    if (props.filterMethod && typeof props.filterMethod === "function") {
      option.visible = props.filterMethod(searchText, option);
    } else {
      const label = option.label?.toString().toLowerCase() || "";
      option.visible = label.includes(searchText);
    }
  });
};

const OnInput = () => {
  if (!props.filterable || props.disabled) return;
  filterOptions();
  visibleRef.value = true;
};

// const handleKeydown = (event: KeyboardEvent) => {
//   if (!props.multiple) return;
//   if (event.key !== "Backspace" && event.key !== "Delete") return;
//   if (inputModel.value !== "") return;
//   Array.isArray(modelValue.value) &&
//     modelValue.value.length > 0 &&
//     modelValue.value.pop();
// };

const optionMap = computed(() => {
  const { valueKey } = props;
  const map = new Map();
  selectOptions.value.forEach((item) => {
    const key =
      typeof item.value === "object" && item.value !== null && valueKey
        ? item.value[valueKey]
        : item.value;
    map.set(key, item.label);
  });
  return map;
});

const selectOptions = ref<LbSelectOptionItem[]>([]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (props.multiple) {
      if (!Array.isArray(value)) {
        value = [value];
      }
    } else {
      if (Array.isArray(value)) {
        value = value[0];
      }
    }
    emits("update:modelValue", value);
    emits("change", value);
  },
});

const modelLabel = computed(() => {
  const modelValueArr = Array.isArray(modelValue.value)
    ? modelValue.value
    : [modelValue.value];

  return modelValueArr.map((v) => {
    const lookupKey =
      typeof v === "object" && v !== null && props.valueKey
        ? v[props.valueKey]
        : v;
    return optionMap.value.get(lookupKey) || "";
  });
});

watch(modelLabel, (newVal) => {
  console.log(newVal);
});

const hasVisibleOptions = computed(() => {
  return selectOptions.value.some((option) => option.visible);
});

watch(
  [modelValue, modelLabel],
  () => {
    if (props.multiple) {
      return;
    }
    inputModel.value = modelLabel.value[0] || "";
  },
  {
    immediate: true,
  }
);

const clear = () => {
  modelValue.value = [];
  inputModel.value = "";
  filterOptions();
};

provide(LbSelectSymbol, {
  valueKey: props.valueKey,
  modelValue,
  props: props.props,
  multiple: props.multiple,
  selectOptions,
  toggleVisible,
  filterable: props.filterable,
  filterOptions,
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
