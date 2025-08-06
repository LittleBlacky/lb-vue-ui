<template>
  <div :class="classes">
    <div v-if="slots.prepend && !isTextarea" :class="bem.e('prepend')">
      <slot name="prepend"></slot>
    </div>
    <div
      :class="{
        [bem.e('wrapper')]: true,
        [bem.em('wrapper', 'prepend')]: slots.prepend && !isTextarea,
        [bem.em('wrapper', 'append')]: slots.append && !isTextarea,
      }"
    >
      <span :class="bem.e('prefix')" v-if="!isTextarea">
        <slot name="prefix"></slot>
      </span>
      <component
        :is="tag"
        v-bind="{ ...$attrs }"
        ref="inputRef"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        :autofocus="autofocus"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        :class="bem.e('inner')"
        :rows="autosize?.minRows || rows"
        :maxlength="maxlength"
        :minlength="minlength"
      />
      <span :class="bem.e('suffix')" v-if="!isTextarea && !showWordLimit">
        <slot name="suffix">
          <template v-if="clearable && modelValue !== undefined">
            <span @click="handleClear" :class="[bem.e('icon')]">
              <lb-icon size="5">
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
            </span>
          </template>
          <template v-if="isPassword && showPassword">
            <span @click="togglePasswordVisibility" :class="[bem.e('icon')]">
              <lb-icon size="5">
                <svg
                  v-if="passwordVisible"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                >
                  <circle cx="256" cy="256" r="64" fill="currentColor"></circle>
                  <path
                    d="M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11c-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72c38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 0 0-.1-34.76zM256 352a96 96 0 1 1 96-96a96.11 96.11 0 0 1-96 96z"
                    fill="currentColor"
                  ></path>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M248 315.85l-51.79-51.79a2 2 0 0 0-3.39 1.69a64.11 64.11 0 0 0 53.49 53.49a2 2 0 0 0 1.69-3.39z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M264 196.15L315.87 248a2 2 0 0 0 3.4-1.69a64.13 64.13 0 0 0-53.55-53.55a2 2 0 0 0-1.72 3.39z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M491 273.36a32.2 32.2 0 0 0-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.68 96a226.54 226.54 0 0 0-71.82 11.79a4 4 0 0 0-1.56 6.63l47.24 47.24a4 4 0 0 0 3.82 1.05a96 96 0 0 1 116 116a4 4 0 0 0 1.05 3.81l67.95 68a4 4 0 0 0 5.4.24a343.81 343.81 0 0 0 67.24-77.4z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M256 352a96 96 0 0 1-93.3-118.63a4 4 0 0 0-1.05-3.81l-66.84-66.87a4 4 0 0 0-5.41-.23c-24.39 20.81-47 46.13-67.67 75.72a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.39 76.14 98.28 100.65C162.06 402 207.92 416 255.68 416a238.22 238.22 0 0 0 72.64-11.55a4 4 0 0 0 1.61-6.64l-47.47-47.46a4 4 0 0 0-3.81-1.05A96 96 0 0 1 256 352z"
                    fill="currentColor"
                  ></path>
                </svg>
              </lb-icon>
            </span>
          </template>
        </slot>
      </span>
      <span v-else :class="bem.e('count')">
        <template v-if="showWordLimit && maxlength">
          <span>
            {{ `${currentLength}/${maxlength}` }}
          </span>
        </template>
      </span>
    </div>
    <div v-if="slots.append && !isTextarea" :class="[bem.e('append')]">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, useSlots } from "vue";
import type { LbInputProps, LbInputEmits, LbInputAutoSize } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

defineOptions({
  name: "LbInput",
  inheritAttrs: false,
});

const slots = useSlots();

const inputRef = ref();

const bem = createNamespace("input");

const props = withDefaults(defineProps<LbInputProps>(), {
  type: "text",
  modelValue: "",
});

const emit = defineEmits<LbInputEmits>();

const passwordVisible = ref(false);

const isTextarea = computed(() => {
  return props.type === "textarea";
});

const isPassword = computed(() => {
  return props.type === "password";
});

const tag = computed(() => {
  if (isTextarea.value) {
    return "textarea";
  }
  return "input";
});

function autoResize(
  textarea: HTMLTextAreaElement | null,
  autoResize: LbInputAutoSize
) {
  if (!textarea) return;

  const { minRows = 1, maxRows = Infinity } = autoResize;

  // 重置高度以重新计算
  textarea.style.height = "auto";

  // 获取计算样式
  const computedStyle = window.getComputedStyle(textarea);
  const lineHeight = parseInt(computedStyle.lineHeight) || 20;
  const paddingTop = parseInt(computedStyle.paddingTop) || 0;
  const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;

  // 计算高度
  const minHeight = minRows * lineHeight + paddingTop + paddingBottom;
  const maxHeight = maxRows * lineHeight + paddingTop + paddingBottom;
  const scrollHeight = textarea.scrollHeight;

  // 应用计算后的高度
  textarea.style.height = `${Math.max(minHeight, Math.min(maxHeight, scrollHeight))}px`;

  // 防止高度抖动
  textarea.style.overflowY = scrollHeight > maxHeight ? "scroll" : "hidden";
}

const classes = computed(() => {
  return [
    bem.b(),
    bem.m(props.size),
    bem.is("textarea", isTextarea.value),
    bem.is("disabled", props.disabled),
  ];
});

const currentLength = computed(() => {
  return props.modelValue.toString().length;
});

const handleInput = (event: Event) => {
  if (isTextarea.value) {
    nextTick(() => {
      autoResize(inputRef.value, props.autosize);
    });
  }
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const handleChange = (event: Event) => {
  emit("change", (event.target as HTMLInputElement).value);
};

const handleFocus = (event: FocusEvent) => {
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  emit("blur", event);
};

const handleClear = () => {
  emit("update:modelValue", "");
  emit("clear");
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

defineExpose({
  inputRef,
});
</script>
