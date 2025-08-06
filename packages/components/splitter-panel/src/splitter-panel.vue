<template>
  <div :class="classes" :style="styles" v-bind="$attrs" ref="panelRef">
    <slot></slot>
  </div>
  <SplitterBar
    v-if="hasBar"
    :direction="splitter?.props.direction"
    :startCollapse="startCollapse"
    :endCollapse="endCollapse"
    :index="panelInstance.index"
    :resizeabel="resizeabel"
    @moving="onMoving"
    @collapse="onCollapse"
  ></SplitterBar>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  watch,
  ref,
  onMounted,
  getCurrentInstance,
  onUnmounted,
  shallowReactive,
} from "vue";
import { createNamespace } from "@lb-vue-ui/utils";
import {
  LbSplitterContextKey,
  type LbSplitterContext,
} from "../../splitter/src/types";
import SplitterBar from "../../splitter-bar/src/splitter-bar.vue";
import type {
  LbSplitterPanelProps,
  LbSplitterPanelEmits,
  LbSplitterPanelInstance,
} from "../index";

defineOptions({
  name: "LbSplitterPanel",
  inheritAttrs: false,
});

const panelRef = ref<HTMLDivElement>();

const props = withDefaults(defineProps<LbSplitterPanelProps>(), {
  resizeabel: true,
  minSize: 0,
  maxSize: Infinity,
});

const sizeModel = ref(props.size);

const instance = getCurrentInstance();

const panelInstance = shallowReactive<LbSplitterPanelInstance>({
  uid: instance?.uid as number,
  index: -1,
  props,
  sizeRef: sizeModel,
});

watch(
  () => props.size,
  () => {
    sizeModel.value = props.size;
  }
);

watch(sizeModel, (newVal) => {
  if (newVal === undefined) return;
  if (newVal < 1) sizeModel.value = 0;
  emits("update:size", sizeModel.value);
});

const emits = defineEmits<LbSplitterPanelEmits>();

const splitter = inject<LbSplitterContext | undefined>(LbSplitterContextKey);

const bem = createNamespace("splitter-panel");

const classes = computed(() => [bem.b()]);

const styles = computed(() => {
  const style: Record<string, string> = {};
  const size = sizeModel.value ?? 0;
  style.flexBasis = `${size}px`;
  style.flexGrow = "0";
  style.flexShrink = "0";
  return style;
});

const startCollapse = computed(() => {
  if (!splitter?.isDragging) return false;
  const nextPanel = splitter?.panelInstances.value[panelInstance.index + 1];
  if (!nextPanel) return false;
  if (!nextPanel.props.resizeabel || !props.resizeabel) return false;
  if (
    nextPanel.sizeRef.value === undefined ||
    nextPanel.sizeRef.value >= nextPanel.props.maxSize
  )
    return false;
  if (sizeModel.value === undefined || sizeModel.value <= props.minSize)
    return false;
  return true;
});

const endCollapse = computed(() => {
  if (!splitter?.isDragging) return false;
  const nextPanel = splitter?.panelInstances.value[panelInstance.index + 1];
  if (!nextPanel) return false;
  if (!nextPanel.props.resizeabel || !props.resizeabel) return false;
  if (
    nextPanel.sizeRef.value === undefined ||
    nextPanel.sizeRef.value <= nextPanel.props.minSize
  ) {
    return false;
  }
  if (sizeModel.value === undefined || sizeModel.value >= props.maxSize) {
    console.log(
      "curPanel false",
      nextPanel.sizeRef.value,
      nextPanel.props.minSize,
      nextPanel.props.maxSize,
      sizeModel.value,
      props.maxSize,
      props.minSize
    );
    return false;
  }
  console.log(true);
  return true;
});

watch(sizeModel, (newVal) => {
  if (newVal === undefined) return;
  emits("update:size", newVal);
});

const onMoving = (distance: number) => {
  if (!splitter?.isDragging || !props.resizeabel) return;
  const curSize = sizeModel.value as number;
  const curMaxSize = props.maxSize;
  const curMinSize = props.minSize;
  const curInstance = panelInstance;
  const nextInstance = splitter.panelInstances.value[curInstance.index + 1];
  const nextSize = nextInstance.sizeRef.value as number;
  const nextMaxSize = nextInstance.props.maxSize as number;
  const nextMinSize = nextInstance.props.minSize as number;
  const totalSize = curSize + nextSize;
  let curNewSize = curSize + distance;
  let nextNewSize = totalSize - curNewSize;

  if (curNewSize < curMinSize || curNewSize > curMaxSize) {
    curNewSize = Math.max(curMinSize, Math.min(curMaxSize, curNewSize));
    nextNewSize = totalSize - curNewSize;
  } else if (nextNewSize < nextMinSize || nextNewSize > nextMaxSize) {
    nextNewSize = Math.max(nextMinSize, Math.min(nextMaxSize, nextNewSize));
    curNewSize = totalSize - nextNewSize;
  }
  sizeModel.value = curNewSize;
  nextInstance.sizeRef.value = nextNewSize;
};

const onCollapse = (index: number, pos: string) => {
  if (!splitter?.isDragging || !panelInstance) return;
  const {
    sizeRef: curSize,
    props: { minSize: curMinSize = 0, maxSize: curMaxSize = Infinity },
  } = splitter.panelInstances.value[index];
  const {
    sizeRef: nextSize,
    props: { minSize: nextMinSize = 0, maxSize: nextMaxSize = Infinity },
  } = splitter.panelInstances.value[index + 1];
  if (curSize.value === undefined || nextSize.value === undefined) return;
  if (pos === "end") {
    let delta = nextSize.value - nextMinSize;
    if (curSize.value + delta > curMaxSize) {
      delta = curMaxSize - curSize.value;
      curSize.value = curMaxSize;
      nextSize.value -= delta;
      if (nextSize.value < nextMinSize) {
        throw new Error(
          "[lb-splitter-panel]: 无法同时满足两个面板的min/max约束，请检查尺寸配置。"
        );
      }
      return;
    }
    curSize.value += delta;
    nextSize.value -= delta;
  } else {
    let delta = curSize.value - curMinSize;
    if (nextSize.value + delta > nextMaxSize) {
      delta = nextMaxSize - nextSize.value;
      nextSize.value = nextMaxSize;
      curSize.value -= delta;
      if (curSize.value < curMinSize) {
        throw new Error(
          "[lb-splitter-panel]: 无法同时满足两个面板的min/max约束，请检查尺寸配置。"
        );
      }
      return;
    }
    curSize.value -= delta;
    nextSize.value += delta;
  }
};

const hasBar = computed(() => {
  if (!splitter || !panelInstance) return false;
  const { index } = panelInstance;
  return index !== -1 && index < splitter?.panelInstances.value.length - 1;
});

onMounted(() => {
  if (splitter) {
    splitter.registerPanel(panelInstance);
  }
});

onUnmounted(() => {
  if (splitter && panelInstance.index !== undefined)
    splitter.unregisterPanel(panelInstance.index);
});
</script>
