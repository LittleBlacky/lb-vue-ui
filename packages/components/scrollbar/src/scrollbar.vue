<template>
  <div ref="scrollbarRef" :class="classes">
    <div
      ref="wrapRef"
      :class="wrapKls"
      :style="wrapStyle"
      :tabindex="tabindex"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        :id="id"
        ref="resizeRef"
        :class="resizeKls"
        :style="viewStyle"
        :role="role"
        :aria-label="ariaLabel"
        :aria-orientation="ariaOrientation"
      >
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <div
        ref="barRef"
        :class="[bem.e('bar'), bem.when('vertical')]"
        @mousedown="clickTrackHandler"
      >
        <div
          ref="thumbRef"
          :class="bem.e('thumb')"
          :style="thumbStyle"
          @mousedown="clickThumbHandler"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, ref, watch } from "vue";
import type {
  LbScrollbarProps,
  LbScrollbarEmits,
  LbScrollbarInstance,
} from "./types";
import { createNamespace } from "@lb-vue-ui/utils";
import { isNumber, isObject } from "@lb-vue-ui/utils";
import { useResizeObserver, useEventListener } from "@lb-vue-ui/hooks";

const bem = createNamespace("scrollbar");

defineOptions({
  name: "LbScrollbar",
});

const props = withDefaults(defineProps<LbScrollbarProps>(), {
  native: false,
  tag: "div",
  always: false,
  minSize: 20,
  tabindex: undefined,
  id: undefined,
  role: undefined,
});

const emit = defineEmits<LbScrollbarEmits>();

// 模板引用
const scrollbarRef = ref<HTMLDivElement>();
const wrapRef = ref<HTMLDivElement>();
const resizeRef = ref<HTMLElement>();
const barRef = ref<HTMLDivElement>();
const thumbRef = ref<HTMLDivElement>();

// 滚动条状态
const sizeWidth = ref("0");
const sizeHeight = ref("0");
const moveX = ref(0);
const moveY = ref(0);
const ratioY = ref(1);
const ratioX = ref(1);

// 拖拽状态
let cursorDown = false;
let cursorLeave = false;
let originalOnSelectStart:
  | ((this: GlobalEventHandlers, ev: Event) => any)
  | null = null;

const classes = computed(() => {
  return [
    bem.b(),
    {
      [bem.when("native")]: props.native,
      [bem.when("always")]: props.always,
    },
  ];
});

const wrapKls = computed(() => {
  return [
    bem.e("wrap"),
    {
      [bem.when("hidden-default")]: !props.native,
    },
    props.wrapClass,
  ];
});

const resizeKls = computed(() => {
  return [bem.e("view"), props.viewClass];
});

const wrapStyle = computed(() => {
  const style: any = {};
  if (props.height) {
    style.height = isNumber(props.height) ? `${props.height}px` : props.height;
  }
  if (props.maxHeight) {
    style.maxHeight = isNumber(props.maxHeight)
      ? `${props.maxHeight}px`
      : props.maxHeight;
  }
  return [style, props.wrapStyle];
});

const viewStyle = computed(() => {
  return {};
});

const thumbStyle = computed(() => {
  return {
    height: sizeHeight.value,
    transform: `translateY(${moveY.value}%)`,
  };
});

const update = () => {
  if (!wrapRef.value) return;

  const offsetHeight = wrapRef.value.offsetHeight - GAP;
  const offsetWidth = wrapRef.value.offsetWidth - GAP;

  const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight;
  const originalWidth = offsetWidth ** 2 / wrapRef.value.scrollWidth;
  const height = Math.max(originalHeight, props.minSize);
  const width = Math.max(originalWidth, props.minSize);

  ratioY.value =
    originalHeight /
    (offsetHeight - originalHeight) /
    (height / (offsetHeight - height));
  ratioX.value =
    originalWidth /
    (offsetWidth - originalWidth) /
    (width / (offsetWidth - width));

  sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : "";
  sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : "";
};

const handleScroll = () => {
  if (wrapRef.value) {
    const offsetHeight = wrapRef.value.offsetHeight - GAP;
    const offsetWidth = wrapRef.value.offsetWidth - GAP;

    moveY.value =
      ((wrapRef.value.scrollTop * 100) / offsetHeight) * ratioY.value;
    moveX.value =
      ((wrapRef.value.scrollLeft * 100) / offsetWidth) * ratioX.value;

    emit("scroll", {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft,
    });

    // 检查是否滚动到底部
    const { scrollTop, scrollHeight, clientHeight } = wrapRef.value;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      emit("end-reached");
    }
  }
};

const scrollTo = (arg1: unknown, arg2?: number) => {
  if (isObject(arg1)) {
    wrapRef.value!.scrollTo(arg1 as ScrollToOptions);
  } else if (isNumber(arg1) && isNumber(arg2)) {
    wrapRef.value!.scrollTo(arg1, arg2);
  }
};

const setScrollTop = (value: number) => {
  if (!isNumber(value)) {
    console.warn("[LbScrollbar]", "value must be a number");
    return;
  }
  wrapRef.value!.scrollTop = value;
};

const setScrollLeft = (value: number) => {
  if (!isNumber(value)) {
    console.warn("[LbScrollbar]", "value must be a number");
    return;
  }
  wrapRef.value!.scrollLeft = value;
};

const clickThumbHandler = (e: MouseEvent) => {
  e.stopPropagation();
  if (e.ctrlKey || [1, 2].includes(e.button)) return;

  window.getSelection()?.removeAllRanges();
  startDrag(e);

  const el = e.currentTarget as HTMLDivElement;
  if (!el) return;

  thumbBeingDragged.value = true;
};

const clickTrackHandler = (e: MouseEvent) => {
  if (!thumbRef.value || !wrapRef.value || !barRef.value) return;

  const offset = Math.abs(
    (e.target as HTMLElement).getBoundingClientRect().top - e.clientY
  );
  const thumbHalf = thumbRef.value.offsetHeight / 2;
  const thumbPositionPercentage =
    ((offset - thumbHalf) * 100 * ratioY.value) / barRef.value.offsetHeight;

  wrapRef.value.scrollTop =
    (thumbPositionPercentage * wrapRef.value.scrollHeight) / 100;
};

const startDrag = (e: MouseEvent) => {
  e.stopImmediatePropagation();
  cursorDown = true;
  document.addEventListener("mousemove", mouseMoveDocumentHandler);
  document.addEventListener("mouseup", mouseUpDocumentHandler);
  originalOnSelectStart = document.onselectstart;
  document.onselectstart = () => false;
};

const mouseMoveDocumentHandler = (e: MouseEvent) => {
  if (!cursorDown || !barRef.value || !thumbRef.value) return;

  const prevPage = thumbRef.value.offsetHeight / 2;
  const offset = (barRef.value.getBoundingClientRect().top - e.clientY) * -1;
  const thumbClickPosition = thumbRef.value.offsetHeight - prevPage;
  const thumbPositionPercentage =
    ((offset - thumbClickPosition) * 100 * ratioY.value) /
    barRef.value.offsetHeight;

  wrapRef.value!.scrollTop =
    (thumbPositionPercentage * wrapRef.value!.scrollHeight) / 100;
};

const mouseUpDocumentHandler = () => {
  cursorDown = false;
  thumbBeingDragged.value = cursorDown;
  document.removeEventListener("mousemove", mouseMoveDocumentHandler);
  document.removeEventListener("mouseup", mouseUpDocumentHandler);
  restoreOnselectstart();
  if (cursorLeave) thumbBeingDragged.value = false;
};

const restoreOnselectstart = () => {
  if (document.onselectstart !== originalOnSelectStart) {
    document.onselectstart = originalOnSelectStart;
  }
};

const thumbBeingDragged = ref(false);
const GAP = 4; // top 2 + bottom 2 of bar

// 监听器
let stopResizeObserver: (() => void) | undefined;
let stopResizeListener: (() => void) | undefined;

watch(
  () => props.noresize,
  (noresize) => {
    if (noresize) {
      stopResizeObserver?.();
      stopResizeListener?.();
    } else {
      ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update));
      stopResizeListener = useEventListener("resize", update);
    }
  },
  { immediate: true }
);

watch(
  () => [props.maxHeight, props.height],
  () => {
    if (!props.native) {
      nextTick(() => {
        update();
        if (wrapRef.value) {
          handleScroll();
        }
      });
    }
  }
);

// 生命周期
onMounted(() => {
  if (!props.native) {
    nextTick(() => {
      update();
    });
  }
});

onUpdated(() => {
  if (!props.native) {
    update();
  }
});

// 暴露实例方法
defineExpose<LbScrollbarInstance>({
  wrapRef: wrapRef as any,
  update,
  scrollTo,
  setScrollTop,
  setScrollLeft,
  handleScroll,
});
</script>
