<template>
  <div :class="classes" :style="styles">
    <img
      v-if="!hasLoadError"
      :src="src"
      :style="imageStyle"
      :class="bem.e('inner')"
      :alt="alt"
      @load="handleLoad"
      @error="handleError"
      @click="clickHandler"
      ref="imgRef"
    />
    <div v-else :class="bem.e('error')">
      <slot name="error">
        <div :class="bem.e('error-icon')">
          <svg
            t="1758186590687"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4621"
            width="200"
            height="200"
          >
            <path
              d="M776 328m-72 0a72 72 0 1 0 144 0 72 72 0 1 0-144 0Z"
              p-id="4622"
              fill="#8a8a8a"
            ></path>
            <path
              d="M999.904 116.608a32 32 0 0 0-21.952-10.912l-456.192-31.904a31.552 31.552 0 0 0-27.2 11.904l-92.192 114.848a32 32 0 0 0 0.672 40.896l146.144 169.952-147.456 194.656 36.48-173.376a32 32 0 0 0-11.136-31.424L235.616 245.504l79.616-125.696a32 32 0 0 0-29.28-49.024l-240.192 16.768a32 32 0 0 0-29.696 34.176l55.808 798.016a32.064 32.064 0 0 0 34.304 29.696l176.512-13.184c17.632-1.312 30.848-16.672 29.504-34.272s-16.576-31.04-34.304-29.536l-144.448 10.784-6.432-92.512 125.312-12.576a32 32 0 0 0 28.672-35.04 32.16 32.16 0 0 0-35.04-28.672l-123.392 12.416L82.144 149.184l145.152-10.144-60.96 96.224a32 32 0 0 0 6.848 41.952l198.4 161.344-58.752 279.296a30.912 30.912 0 0 0 0.736 14.752 31.68 31.68 0 0 0 1.408 11.04l51.52 154.56a31.968 31.968 0 0 0 27.456 21.76l523.104 47.552a32.064 32.064 0 0 0 34.848-29.632L1007.68 139.84a32.064 32.064 0 0 0-7.776-23.232z m-98.912 630.848l-412.576-39.648a31.52 31.52 0 0 0-34.912 28.768 32 32 0 0 0 28.8 34.912l414.24 39.808-6.272 89.536-469.728-42.72-39.584-118.72 234.816-310.016a31.936 31.936 0 0 0-1.248-40.192L468.896 219.84l65.088-81.056 407.584 28.48-40.576 580.192z"
              p-id="4623"
              fill="#8a8a8a"
            ></path>
          </svg>
        </div>
        <div :class="bem.e('error-text')">加载失败</div>
      </slot>
    </div>
    <lb-image-preview
      v-model:visible="showPreview"
      :preview-list="previewList"
      :initial-index="initialIndex"
      @close="closePreview"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
import type { LbImageProps, LbImageEmits } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";
import { LbImagePreview } from "@lb-vue-ui/components";
const bem = createNamespace("image");

defineOptions({
  name: "LbImage",
});

const props = withDefaults(defineProps<LbImageProps>(), {
  fit: "fill",
  lazy: false,
  previewList: () => [] as string[],
  initialIndex: 0,
  zoomStep: 0.2,
  maxZoom: 3,
  minZoom: 0.2,
});

const emit = defineEmits<LbImageEmits>();

const hasLoadError = ref(false);
const isLoading = ref(true);
const imgRef = ref<HTMLImageElement | null>(null);
const showPreview = ref(false);
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);

const classes = computed(() => {
  return [bem.b(), props.radius ? bem.m("radius") : ""];
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

  return style;
});

const imageStyle = computed(() => {
  return {
    objectFit: props.fit,
  };
});

const handleLoad = (event: Event) => {
  isLoading.value = false;
  hasLoadError.value = false;
  emit("load", event);
};

const handleError = (event: Event) => {
  if (props.lazy && !isIntersected.value) {
    return;
  }
  isLoading.value = false;
  hasLoadError.value = true;
  emit("error", event);
};

const clickHandler = () => {
  if (props.previewList.length && !hasLoadError.value) {
    showPreview.value = true;
    scale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    document.body.style.overflow = "hidden";
  }
};

const closePreview = () => {
  showPreview.value = false;
  document.body.style.overflow = "";
};

const handleMouseMove = (e: MouseEvent) => {
  if (isDragging.value) {
    translateX.value = e.clientX - startX.value;
    translateY.value = e.clientY - startY.value;
  }
};

const handleMouseUp = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

const observer = ref<IntersectionObserver | null>(null);
const isIntersected = ref(false);
const actualSrc = ref("");

const src = computed(() => {
  if (props.lazy) {
    return isIntersected.value ? actualSrc.value : "";
  }
  return props.src || "";
});

const initLazyLoad = () => {
  if (!props.lazy || !window.IntersectionObserver || !imgRef.value) {
    return;
  }

  observer.value = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        isIntersected.value = true;
        actualSrc.value = props.src || "";
        if (observer.value && imgRef.value) {
          observer.value.unobserve(imgRef.value);
          observer.value.disconnect();
          observer.value = null;
        }
      }
    },
    {
      rootMargin: "50px",
      threshold: 0.1,
    }
  );

  observer.value.observe(imgRef.value);
};

onMounted(() => {
  if (props.lazy) {
    nextTick(() => {
      initLazyLoad();
    });
  } else {
    actualSrc.value = props.src || "";
  }
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});

// 提供插槽
defineSlots<{
  error?: () => any;
  loading?: () => any;
}>();
</script>
