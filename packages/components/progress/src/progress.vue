<template>
  <div :class="classes" :style="containerStyles" @click="handleClick">
    <!-- 线性进度条 (SVG实现) -->
    <div v-if="type === 'line'" :class="bem.e('line')">
      <svg
        :width="lineWidth"
        :height="lineHeight"
        :class="bem.e('line-svg')"
        :style="lineSvgStyles"
      >
        <!-- 进度条轨道 -->
        <rect
          :class="bem.e('line-track')"
          x="0"
          y="0"
          :width="lineWidth"
          :height="lineHeight"
          fill="var(--lb-progress-bg-color)"
          rx="4"
        />

        <!-- 进度条 -->
        <rect
          :class="bem.e('line-bar')"
          :style="{
            fill: lineFillColor,
          }"
          x="0"
          y="0"
          :width="lineBarWidth"
          :height="lineHeight"
          :fill="striped ? 'url(#stripeMask)' : lineFillColor"
          rx="4"
        />

        <!-- 内部文字 -->
        <text
          v-if="showText && textPosition === 'inside'"
          :class="bem.e('line-text')"
          :x="lineBarWidth / 2"
          :y="lineHeight / 2"
          text-anchor="middle"
          dominant-baseline="middle"
          :fill="textColor"
          :font-size="textFontSize"
        >
          {{ displayText }}
        </text>
      </svg>

      <!-- 外部文字 -->
      <div
        v-if="showText && textPosition === 'outside'"
        :class="bem.e('line-text-outer')"
      >
        <slot :percentage="percentage">
          {{ displayText }}
        </slot>
      </div>
    </div>

    <!-- 圆形进度条 -->
    <div v-else-if="type === 'circle'" :class="bem.e('circle')">
      <svg
        :width="circleSize"
        :height="circleSize"
        :class="bem.e('circle-svg')"
      >
        <!-- 进度条轨道 -->
        <circle
          v-if="showTrack"
          :class="bem.e('circle-track')"
          :cx="circleCenter"
          :cy="circleCenter"
          :r="circleRadius"
          :stroke="trackColor"
          :stroke-width="strokeWidthCircle"
          fill="none"
        />

        <!-- 进度条 -->
        <circle
          :class="[
            bem.e('circle-bar'),
            bem.is('animated', animated),
            bem.is('disabled', disabled),
          ]"
          :style="{
            stroke: lineFillColor,
          }"
          style="fill: none"
          :cx="circleCenter"
          :cy="circleCenter"
          :r="circleRadius"
          :stroke-width="strokeWidthCircle"
          :stroke-linecap="strokeLinecap"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
        />
      </svg>

      <!-- 圆形进度条文字 -->
      <div v-if="showText" :class="bem.e('circle-text')">
        <slot :percentage="percentage">
          {{ displayText }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { createNamespace } from "@lb-vue-ui/utils";
import type { LbProgressProps, LbProgressEmits } from "./types";

defineOptions({
  name: "LbProgress",
});

const props = withDefaults(defineProps<LbProgressProps>(), {
  percentage: 0,
  type: "line",
  strokeWidth: 6,
  showText: false,
  textPosition: "outside",
  status: "info",
  size: "base",
  width: 200,
  height: undefined,
  color: undefined,
  animated: false,
  duration: 300,
  showTrack: true,
  interactive: false,
  min: 0,
  max: 100,
  striped: false,
  showIcon: false,
  disabled: false,
});

const emit = defineEmits<LbProgressEmits>();

const bem = createNamespace("progress");

// 当前进度值（用于动画）
const currentPercentage = ref(props.percentage);

// 监听进度变化，实现动画效果
watch(
  () => props.percentage,
  (newVal) => {
    if (props.animated) {
      // 使用 requestAnimationFrame 实现平滑动画
      const startVal = currentPercentage.value;
      const endVal = newVal;
      const duration = props.duration;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用 easeOut 缓动函数
        const easeOut = 1 - Math.pow(1 - progress, 3);
        currentPercentage.value = startVal + (endVal - startVal) * easeOut;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          currentPercentage.value = endVal;
        }
      };

      requestAnimationFrame(animate);
    } else {
      currentPercentage.value = newVal;
    }
  },
  { immediate: true }
);

// 组件挂载时初始化进度值
onMounted(() => {
  if (props.animated) {
    currentPercentage.value = 0;
    setTimeout(() => {
      currentPercentage.value = props.percentage;
    }, 50);
  }
});

// 点击事件处理
const handleClick = (event: MouseEvent) => {
  if (!props.interactive || props.disabled) return;

  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = Math.round((clickX / rect.width) * 100);

  emit("click", {
    percentage: Math.max(props.min, Math.min(props.max, percentage)),
    event,
  });
};

// 显示文字
const showText = computed(() => {
  return props.showText;
});

// 显示的文字内容
const displayText = computed(() => {
  const actualPercentage = Math.min(
    Math.max(currentPercentage.value, props.min),
    props.max
  );
  const normalizedPercentage =
    ((actualPercentage - props.min) / (props.max - props.min)) * 100;

  if (props.status === "success") {
    return "✓";
  } else if (props.status === "danger") {
    return "✗";
  }

  return `${Math.round(normalizedPercentage)}%`;
});

// 圆形进度条相关计算属性
const circleSize = computed(() => {
  const sizeMap = {
    small: 80,
    base: 120,
    large: 160,
  };

  if (typeof props.width === "number") {
    return props.width;
  }

  return sizeMap[props.size] || sizeMap.base;
});

const circleRadius = computed(() => {
  return (circleSize.value - props.strokeWidth) / 2;
});

const circleCenter = computed(() => {
  return circleSize.value / 2;
});

const circleCircumference = computed(() => {
  return 2 * Math.PI * circleRadius.value;
});

const circumference = computed(() => {
  return circleCircumference.value;
});

const dashOffset = computed(() => {
  const actualPercentage = Math.min(
    Math.max(currentPercentage.value, props.min),
    props.max
  );
  const normalizedPercentage =
    ((actualPercentage - props.min) / (props.max - props.min)) * 100;

  return circleCircumference.value * (1 - normalizedPercentage / 100);
});

// 样式类
const classes = computed(() => {
  return [
    bem.b(),
    bem.m(props.type),
    bem.m(props.size),
    bem.is("success", props.status === "success"),
    bem.is("warning", props.status === "warning"),
    bem.is("danger", props.status === "danger"),
    bem.is("disabled", props.disabled),
    bem.is("interactive", props.interactive),
    bem.is("animated", props.animated),
  ];
});

const containerStyles = computed(() => {
  const styles: Record<string, any> = {};
  return styles;
});

// 线性进度条SVG相关计算属性
const lineWidth = computed(() => {
  return typeof props.width === "number" ? props.width : 200;
});

const lineHeight = computed(() => {
  return Math.max(
    typeof props.height === "number" ? props.height : props.strokeWidth + 10,
    props.strokeWidth + 4
  );
});

const lineSvgStyles = computed(() => {
  const styles: Record<string, any> = {};

  if (props.animated) {
    styles.transition = `all ${props.duration}ms ease-out`;
  }

  return styles;
});

const lineBarWidth = computed(() => {
  const actualPercentage = Math.min(
    Math.max(currentPercentage.value, props.min),
    props.max
  );
  const normalizedPercentage =
    ((actualPercentage - props.min) / (props.max - props.min)) * 100;

  return (lineWidth.value * normalizedPercentage) / 100;
});

// 根据百分比获取颜色（element-plus风格）
const getColorByPercentage = (percentage: number) => {
  if (!props.color || !Array.isArray(props.color)) {
    console.log("No color array found, returning null");
    return null;
  }

  // 按百分比排序
  const sortedColors = [...props.color].sort(
    (a, b) => a.percentage - b.percentage
  );

  // 找到匹配的颜色
  for (let i = 0; i < sortedColors.length; i++) {
    if (percentage <= sortedColors[i].percentage) {
      console.log(`Found matching color at index ${i}:`, sortedColors[i]);
      return sortedColors[i].color;
    }
  }

  // 如果超过所有阈值，返回最后一个颜色
  const lastColor = sortedColors[sortedColors.length - 1]?.color || null;
  return lastColor;
};

// 填充颜色
const lineFillColor = computed(() => {
  console.log("lineFillColor computed - props.color:", props.color);
  const actualPercentage = Math.min(
    Math.max(currentPercentage.value, props.min),
    props.max
  );
  const normalizedPercentage =
    ((actualPercentage - props.min) / (props.max - props.min)) * 100;

  console.log("normalizedPercentage:", normalizedPercentage);

  if (props.color) {
    if (typeof props.color === "string") {
      console.log("Using string color:", props.color);
      return props.color;
    } else if (typeof props.color === "function") {
      const result = props.color(normalizedPercentage);
      console.log("Using function color, result:", result);
      return result;
    } else if (Array.isArray(props.color)) {
      // element-plus风格的颜色数组
      const colorFromArray = getColorByPercentage(normalizedPercentage);
      console.log("Using array color, result:", colorFromArray);
      if (colorFromArray) {
        return colorFromArray;
      }
    }
  }

  // 根据状态设置默认颜色
  const statusColors = {
    success: "#67c23a",
    danger: "#f56c6c",
    warning: "#e6a23c",
    info: "#409eff",
  };
  const defaultColor = statusColors[props.status] || statusColors.info;
  console.log("Using default color:", defaultColor);
  return defaultColor;
});

const circleFillColor = computed(() => {
  console.log("circleFillColor computed - props.color:", props.color);
  const actualPercentage = Math.min(
    Math.max(currentPercentage.value, props.min),
    props.max
  );
  const normalizedPercentage =
    ((actualPercentage - props.min) / (props.max - props.min)) * 100;

  if (props.color) {
    if (typeof props.color === "string") {
      console.log("Circle using string color:", props.color);
      return props.color;
    } else if (typeof props.color === "function") {
      const result = props.color(normalizedPercentage);
      console.log("Circle using function color, result:", result);
      return result;
    } else if (Array.isArray(props.color)) {
      // element-plus风格的颜色数组
      const colorFromArray = getColorByPercentage(normalizedPercentage);
      console.log("Circle using array color, result:", colorFromArray);
      if (colorFromArray) {
        return colorFromArray;
      }
    }
  }

  // 根据状态设置默认颜色
  const statusColors = {
    success: "#67c23a",
    danger: "#f56c6c",
    warning: "#e6a23c",
    info: "#409eff",
  };
  const defaultColor = statusColors[props.status] || statusColors.info;
  console.log("Circle using default color:", defaultColor);
  return defaultColor;
});

// 文字相关
const textColor = computed(() => {
  return props.textPosition === "inside"
    ? "#ffffff"
    : "var(--lb-text-color-regular)";
});

const textFontSize = computed(() => {
  const sizeMap = {
    small: "12px",
    base: "14px",
    large: "16px",
  };
  return sizeMap[props.size] || "14px";
});

// 条纹效果
const striped = computed(() => {
  return props.striped || false;
});

// 圆形进度条属性
const strokeWidthCircle = computed(() => {
  return props.strokeWidth;
});

const strokeLinecap = computed(() => {
  return "round";
});

const trackColor = computed(() => {
  return "#e4e7ed";
});
</script>
