<template>
  <teleport to="body">
    <transition name="lb-fade">
      <div
        v-if="visible"
        :class="classes"
        :style="styles"
        @click="handleMaskClick"
        @keydown="handleKeydown"
        tabindex="-1"
      >
        <!-- 主图区域 -->
        <div :class="bem.e('content')">
          <!-- 上一张按钮 -->
          <div
            v-if="previewList.length > 1"
            :class="[bem.e('btn'), bem.e('prev')]"
            @click.stop="prev"
          >
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
              />
            </svg>
          </div>

          <!-- 图片容器 -->
          <div :class="bem.e('img-wrapper')">
            <img
              v-for="(url, i) in previewList"
              v-show="i === activeIndex"
              :key="url"
              :src="url"
              :class="bem.e('img')"
              :style="imgStyle"
              @mousedown="enableDrag && handleMouseDown($event)"
              @wheel="enableWheel && handleWheel($event)"
            />
          </div>

          <!-- 下一张按钮 -->
          <div
            v-if="previewList.length > 1"
            :class="[bem.e('btn'), bem.e('next')]"
            @click.stop="next"
          >
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
              />
            </svg>
          </div>

          <!-- 关闭按钮 -->
          <div v-if="showClose" :class="bem.e('close')" @click.stop="close">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
              />
            </svg>
          </div>

          <!-- 工具栏 -->
          <div v-if="showToolbar" :class="bem.e('toolbar')">
            <div :class="bem.e('toolbar-item')" @click.stop="zoomOut">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
                />
              </svg>
            </div>
            <div :class="bem.e('toolbar-item')">
              <span>{{ Math.round(scale * 100) }}%</span>
            </div>
            <div :class="bem.e('toolbar-item')" @click.stop="zoomIn">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                />
              </svg>
            </div>
            <div :class="bem.e('toolbar-item')" @click.stop="handleRotate(-90)">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"
                />
              </svg>
            </div>
            <div :class="bem.e('toolbar-item')" @click.stop="handleRotate(90)">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
                />
              </svg>
            </div>
          </div>

          <!-- 索引指示器 -->
          <div
            v-if="showIndex && previewList.length > 1"
            :class="bem.e('index')"
          >
            {{ activeIndex + 1 }} / {{ previewList.length }}
          </div>

          <!-- 缩略图 -->
          <div
            v-if="showThumbnail && previewList.length > 1"
            :class="bem.e('thumbnails')"
          >
            <div
              v-for="(url, index) in previewList"
              :key="url"
              :class="[
                bem.e('thumbnail'),
                { 'is-active': index === activeIndex },
              ]"
              @click.stop="setActiveIndex(index)"
            >
              <img :src="url" :alt="`thumbnail-${index}`" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount, nextTick } from "vue";
import type { LbImagePreviewProps, LbImagePreviewEmits } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("image-preview");

defineOptions({
  name: "LbImagePreview",
});

const props = withDefaults(defineProps<LbImagePreviewProps>(), {
  visible: false,
  initialIndex: 0,
  previewList: () => [] as string[],
  showClose: true,
  showToolbar: true,
  showThumbnail: true,
  showIndex: true,
  zoomStep: 0.2,
  maxZoom: 3,
  minZoom: 0.2,
  loop: true,
  enableKeyboard: true,
  enableWheel: true,
  enableDrag: true,
  enableRotate: true,
  zIndex: 2000,
  maskBackground: "rgba(0, 0, 0, 0.9)",
});

const emit = defineEmits<LbImagePreviewEmits>();

// 状态管理
const visible = computed({
  get: () => props.visible,
  set: (val) => emit("update:visible", val),
});
const activeIndex = ref(props.initialIndex);
const scale = ref(1);
const rotate = ref(0);
const translateX = ref(0);
const translateY = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);

// 监听初始索引变化
watch(
  () => props.initialIndex,
  (val) => {
    activeIndex.value = val;
  }
);

// 监听可见性变化
watch(
  () => props.visible,
  (val) => {
    if (val) {
      // 重置状态
      resetTransform();
      // 聚焦元素以便键盘事件
      nextTick(() => {
        const container = document.querySelector(`.${bem.b()}`) as HTMLElement;
        if (container) {
          container.focus();
        }
      });
      // 禁止滚动
      document.body.style.overflow = "hidden";
    } else {
      // 恢复滚动
      document.body.style.overflow = "";
    }
  }
);

// 样式计算
const classes = computed(() => {
  return [bem.b()];
});

const styles = computed(() => {
  return {
    zIndex: props.zIndex,
    backgroundColor: props.maskBackground,
  };
});

const imgStyle = computed(() => {
  return {
    transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value}) rotate(${rotate.value}deg)`,
  };
});

// 方法
const resetTransform = () => {
  scale.value = 1;
  rotate.value = 0;
  translateX.value = 0;
  translateY.value = 0;
};

const setActiveIndex = (index: number) => {
  activeIndex.value = index;
  resetTransform();
  emit("change", index);
};

const prev = () => {
  if (props.previewList.length <= 1) return;

  if (activeIndex.value > 0) {
    setActiveIndex(activeIndex.value - 1);
  } else if (props.loop) {
    setActiveIndex(props.previewList.length - 1);
  }
};

const next = () => {
  if (props.previewList.length <= 1) return;

  if (activeIndex.value < props.previewList.length - 1) {
    setActiveIndex(activeIndex.value + 1);
  } else if (props.loop) {
    setActiveIndex(0);
  }
};

const close = () => {
  visible.value = false;
  emit("close");
};

const handleMaskClick = (e: MouseEvent) => {
  // 如果正在拖拽或者点击的是图片，不关闭预览
  if (isDragging.value) return;

  // 检查点击的目标是否是图片或图片容器
  const target = e.target as HTMLElement;
  if (target.tagName === "IMG" || target.closest(`.${bem.e("img-wrapper")}`)) {
    return;
  }

  close();
};

// 缩放功能
const zoomIn = () => {
  if (scale.value < props.maxZoom) {
    scale.value = Math.min(props.maxZoom, scale.value + props.zoomStep);
    emit("scale", scale.value);
  }
};

const zoomOut = () => {
  if (scale.value > props.minZoom) {
    scale.value = Math.max(props.minZoom, scale.value - props.zoomStep);
    emit("scale", scale.value);
  }
};

const handleWheel = (e: WheelEvent) => {
  if (!props.enableWheel) return;
  e.preventDefault();

  const delta = e.deltaY > 0 ? -props.zoomStep : props.zoomStep;
  const newScale = Math.max(
    props.minZoom,
    Math.min(props.maxZoom, scale.value + delta)
  );

  // 计算鼠标位置相对于图片中心的偏移
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const offsetX = e.clientX - rect.left - rect.width / 2;
  const offsetY = e.clientY - rect.top - rect.height / 2;

  // 根据缩放比例调整偏移量
  const scaleDiff = newScale - scale.value;
  translateX.value += (offsetX * scaleDiff) / scale.value;
  translateY.value += (offsetY * scaleDiff) / scale.value;

  scale.value = newScale;
  emit("scale", scale.value);
};

// 旋转功能
const handleRotate = (angle: number) => {
  if (!props.enableRotate) return;
  rotate.value = (rotate.value + angle) % 360;
  emit("rotate", rotate.value);
};

// 拖拽功能
const handleMouseDown = (e: MouseEvent) => {
  if (!props.enableDrag) return;
  e.preventDefault();
  isDragging.value = true;
  startX.value = e.clientX;
  startY.value = e.clientY;

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  // 添加鼠标样式
  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
};

const handleMouseMove = (e: MouseEvent) => {
  e.preventDefault();
  if (isDragging.value) {
    const deltaX = e.clientX - startX.value;
    const deltaY = e.clientY - startY.value;

    translateX.value += deltaX;
    translateY.value += deltaY;

    startX.value = e.clientX;
    startY.value = e.clientY;
  }
};

const handleMouseUp = (e: MouseEvent) => {
  // 如果鼠标抬起时还在拖拽状态，需要延迟一帧再重置状态
  // 这样可以避免mouseup事件立即触发mask的click事件
  if (isDragging.value) {
    setTimeout(() => {
      isDragging.value = false;
    }, 0);
  }

  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
  // 恢复鼠标样式
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
};

// 键盘事件处理
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.enableKeyboard) return;

  switch (e.key) {
    case "ArrowLeft":
      prev();
      break;
    case "ArrowRight":
      next();
      break;
    case "ArrowUp":
      zoomIn();
      break;
    case "ArrowDown":
      zoomOut();
      break;
    case "Escape":
      close();
      break;
  }
};

// 清理事件监听
onBeforeUnmount(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
  document.body.style.overflow = "";
});
</script>
