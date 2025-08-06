<template>
  <div :class="classes" :style="styles" @click="handleClick">
    <!-- 头部区域 -->
    <div
      v-if="showHeader || $slots.header || header"
      :class="headerClasses"
      :style="headerStyles"
      @click="handleHeaderClick"
    >
      <slot name="header">
        <div class="card-header-content">
          <h3 v-if="header" class="card-title">{{ header }}</h3>
          <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
        </div>
      </slot>
    </div>

    <!-- 内容区域 -->
    <div :class="bodyClasses" :style="bodyStyles">
      <slot></slot>
    </div>

    <!-- 底部区域 -->
    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer"></slot>
    </div>

    <!-- 加载遮罩 -->
    <div v-if="loading" class="card-loading-mask">
      <div class="card-loading-spinner">
        <svg viewBox="0 0 50 50" class="loading-svg">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            class="loading-circle"
          ></circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { LbCardProps, LbCardEmits } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("card");

defineOptions({
  name: "LbCard",
});

const props = withDefaults(defineProps<LbCardProps>(), {
  showHeader: true,
  bordered: true,
  shadow: "always",
  disabled: false,
  clickable: false,
  loading: false,
  radius: "8px",
});

const emit = defineEmits<LbCardEmits>();

const classes = computed(() => {
  return [
    bem.b(),
    {
      [bem.m("bordered")]: props.bordered,
      [bem.m("disabled")]: props.disabled,
      [bem.m("clickable")]: props.clickable,
      [bem.m("loading")]: props.loading,
      [`${bem.b()}--shadow-${props.shadow}`]: props.shadow !== "never",
    },
  ];
});

const styles = computed(() => {
  const style: Record<string, string> = {};

  if (props.width) {
    style.width =
      typeof props.width === "number" ? `${props.width}px` : props.width;
  }

  if (props.height) {
    style.height =
      typeof props.height === "number" ? `${props.height}px` : props.height;
  }

  if (props.radius) {
    style.borderRadius =
      typeof props.radius === "number" ? `${props.radius}px` : props.radius;
  }

  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor;
  }

  return style;
});

const headerClasses = computed(() => {
  return [
    bem.e("header"),
    props.headerClass,
    {
      [bem.m("clickable")]: props.clickable,
    },
  ];
});

const headerStyles = computed(() => {
  const style: Record<string, string> = {};

  if (props.headerBackgroundColor) {
    style.backgroundColor = props.headerBackgroundColor;
  }

  return style;
});

const bodyClasses = computed(() => {
  return [bem.e("body"), props.bodyClass];
});

const bodyStyles = computed(() => {
  return {};
});

const footerClasses = computed(() => {
  return [bem.e("footer")];
});

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return;

  if (props.clickable) {
    emit("click", event);
  }
};

const handleHeaderClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return;

  emit("header-click", event);
};
</script>
