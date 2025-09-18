<template>
  <transition :name="bem.b('fade')" @after-leave="handleAfterLeave">
    <div v-show="visible" :class="rootClasses" :style="rootStyles">
      <div :class="bem.e('spinner')">
        <!-- 自定义图标 -->
        <i v-if="spinner" :class="[bem.e('icon'), spinner]" />
        <!-- 默认SVG加载动画 -->
        <svg v-else :class="bem.e('circular')" viewBox="0 0 50 50">
          <circle :class="bem.e('path')" cx="25" cy="25" r="20" fill="none" />
        </svg>
        <!-- 加载文本 -->
        <p v-if="displayText" :class="bem.e('text')">
          {{ displayText }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { createNamespace } from "@lb-vue-ui/utils";
import { loadingProps, type LbLoadingEmits } from "./types";

const bem = createNamespace("loading");

defineOptions({
  name: "LbLoading",
});

const props = defineProps(loadingProps);
const emit = defineEmits<LbLoadingEmits>();

// 内部状态
const internalVisible = ref(props.visible);
const internalText = ref(props.text);

// 计算属性
const visible = computed(() => internalVisible.value);

const displayText = computed(() => internalText.value || props.text);

const rootClasses = computed(() => [
  bem.b(),
  {
    [bem.m("fullscreen")]: props.fullscreen,
  },
  props.customClass,
]);

const rootStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (props.background) {
    styles.backgroundColor = props.background;
  }

  return styles;
});

// 监听props变化
watch(
  () => props.visible,
  (newVal) => {
    internalVisible.value = newVal;
  },
  { immediate: true }
);

watch(
  () => props.text,
  (newVal) => {
    internalText.value = newVal;
  },
  { immediate: true }
);

// 方法
const close = () => {
  internalVisible.value = false;
};

const setText = (text: string) => {
  internalText.value = text;
};

const setVisible = (visible: boolean) => {
  internalVisible.value = visible;
};

const handleAfterLeave = () => {
  emit("closed");
};

// 暴露给父组件的方法
defineExpose({
  close,
  setText,
  setVisible,
  visible: internalVisible,
});
</script>
