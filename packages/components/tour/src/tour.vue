<template>
  <div :class="bem.b('tour')">
    <!-- 遮罩层 - 使用CSS clip-path创建挖洞效果 -->
    <Teleport to="body">
      <Transition name="lb-fade">
        <div
          v-if="visible && mergedMask"
          :class="[bem.e('mask')]"
          :style="maskStyle"
          @click="handleMaskClick"
        ></div>
      </Transition>
    </Teleport>
    <slot />
    <!-- 使用 Tooltip 组件显示步骤内容 -->
    <LbTooltip
      ref="tooltipRef"
      v-model:visible="visible"
      :virtual-triggering="true"
      :virtual-ref="currentTargetElement"
      :placement="currentPlacement"
      :offset="12"
      :show-after="0"
      :content="currentStepData?.description || ''"
      :hide-after="0"
      :disabled="false"
      :popper-class="bem.e('tooltip')"
    >
      <template #content>
        <div :class="bem.e('content')">
          <div :class="bem.e('header')">
            <h3 v-if="currentStepData?.title" :class="bem.e('title')">
              {{ currentStepData.title }}
            </h3>
            <!-- 关闭按钮 -->
            <lb-button
              v-if="closable"
              circle
              :class="bem.e('close')"
              size="small"
              @click="handleClose"
            >
              ×
            </lb-button>
          </div>
          <!-- 内容插槽 -->
          <div :class="bem.e('body')">
            <!-- 默认内容 -->
            <div v-if="currentStepData?.cover" :class="bem.e('cover')">
              <lb-image
                v-if="typeof currentStepData.cover === 'string'"
                :src="currentStepData.cover"
                alt="tour cover"
              />
              <component v-else :is="currentStepData.cover" />
            </div>

            <div :class="bem.e('description')">
              <p v-if="currentStepData?.description">
                {{ currentStepData.description }}
              </p>
            </div>
          </div>

          <!-- 底部操作区 -->
          <div :class="bem.e('footer')">
            <!-- 指示器 -->
            <div :class="bem.e('indicators')">
              <span
                v-for="(_, index) in totalSteps"
                :key="index"
                :class="[
                  bem.e('indicator'),
                  { [bem.m('active')]: index === current },
                ]"
              />
            </div>

            <!-- 操作按钮 -->
            <div :class="bem.e('buttons')">
              <lb-button v-if="current > 0" @click="handlePrev">
                {{ prevButtonText }}
              </lb-button>

              <lb-button @click="handleNext()" type="primary">
                {{ isLastStep ? finishButtonText : nextButtonText }}
              </lb-button>
            </div>
          </div>
        </div>
      </template>
    </LbTooltip>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
  provide,
  reactive,
} from "vue";
import { createNamespace } from "@lb-vue-ui/utils";
import { LbTooltip, LbImage, LbButton } from "@lb-vue-ui/components";
import type { LbTourProps, LbTourStepConfig, LbTourInstance } from "./types";

defineOptions({
  name: "LbTour",
});

const bem = createNamespace("tour");

const props = withDefaults(defineProps<LbTourProps>(), {
  modelValue: false,
  current: 0,
  mask: true,
  closable: true,
  showArrow: true,
  showIndicators: true,
  placement: "bottom",
  scrollIntoViewOptions: true,
});

const emit = defineEmits<{
  "update:modelValue": [val: boolean];
  close: [];
  finish: [];
  change: [current: number, prev: number];
  "update:current": [current: number];
}>();

const tooltipRef = ref();
const currentTargetElement = ref<HTMLElement>();

const forceUpdateSpotlight = ref(0);

const registeredSteps = reactive<Map<number, LbTourStepConfig>>(new Map());

const registerStep = (stepConfig: LbTourStepConfig, uid: number) => {
  registeredSteps.set(uid, stepConfig);
};

const unregisterStep = (uid: number) => {
  registeredSteps.delete(uid);
};

provide("tour-register-step", registerStep);
provide("tour-unregister-step", unregisterStep);

const visible = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    if (!val) {
      emit("close");
    }
    emit("update:modelValue", val);
  },
});
const currentStep = computed({
  get: () => props.current,
  set: (val) => {
    emit("update:current", val);
  },
});
const allSteps = computed(() => {
  const steps: LbTourStepConfig[] = [];
  const sortedSteps = Array.from(registeredSteps.entries())
    .sort(([a], [b]) => a - b)
    .map(([, step]) => step);
  steps.push(...sortedSteps);
  return steps;
});

const totalSteps = computed(() => allSteps.value.length);

const currentStepConfig = computed((): LbTourStepConfig | undefined => {
  if (currentStep.value >= allSteps.value.length) {
    return undefined;
  }
  return allSteps.value[currentStep.value];
});

const mergedMask = computed(() => {
  const maskValue =
    currentStepConfig.value?.mask !== undefined
      ? currentStepConfig.value.mask
      : props.mask;
  return maskValue;
});

const currentPlacement = computed(() => {
  return currentStepConfig.value?.placement || props.placement;
});

const currentStepData = computed(() => currentStepConfig.value);

const prevButtonText = computed(() => "上一步");
const nextButtonText = computed(() => "下一步");
const finishButtonText = computed(() => "完成");

const isLastStep = computed(() => currentStep.value >= totalSteps.value - 1);

const maskStyle = computed(() => {
  forceUpdateSpotlight.value;

  if (!currentTargetElement.value) return {};

  const rect = currentTargetElement.value.getBoundingClientRect();
  const padding = 4;

  const holeLeft = rect.left - padding;
  const holeTop = rect.top - padding;
  const holeRight = rect.right + padding;
  const holeBottom = rect.bottom + padding;

  const clipPath = `polygon(
    0% 0%,
    0% 100%,
    ${holeLeft}px 100%,
    ${holeLeft}px ${holeTop}px,
    ${holeRight}px ${holeTop}px,
    ${holeRight}px ${holeBottom}px,
    ${holeLeft}px ${holeBottom}px,
    ${holeLeft}px 100%,
    100% 100%,
    100% 0%
  )`;

  return {
    position: "fixed",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    backgroundColor: "var(--lb-tour-mask-bg-color)",
    zIndex: "var(--lb-tour-z-index-mask)",
    clipPath,
    pointerEvents: "auto",
  };
});

const scrollToTarget = (element: HTMLElement) => {
  if (!element) return;
  const scrollOptions = props.scrollIntoViewOptions;
  if (scrollOptions === false) {
    return;
  }
  const defaultOptions: ScrollIntoViewOptions = {
    behavior: "smooth",
    block: "center",
    inline: "center",
  };
  const finalOptions =
    scrollOptions === true || scrollOptions === undefined
      ? defaultOptions
      : { ...defaultOptions, ...scrollOptions };
  element.scrollIntoView(finalOptions);
};

const updateTargetElement = () => {
  if (!currentStepConfig.value?.target) {
    currentTargetElement.value = undefined;
    return;
  }

  const target = currentStepConfig.value.target;
  let element: HTMLElement | null = null;

  if (typeof target === "string") {
    element = document.querySelector(target);
  } else if (target instanceof HTMLElement) {
    element = target;
  } else if (typeof target === "function") {
    element = target();
  }

  currentTargetElement.value = element || undefined;

  if (element) {
    nextTick(() => {
      scrollToTarget(element);
    });
  }
};

const handleMaskClick = () => {
  if (props.closable) {
    handleClose();
  }
};

const handleClose = () => {
  handleFinish();
};

const changeStep = (nextStep: number) => {
  const prev = currentStep.value;
  currentStep.value = nextStep;
  emit("change", nextStep, prev);
};

const handlePrev = () => {
  if (currentStep.value > 0) {
    changeStep(currentStep.value - 1);
  }
};

const handleNext = () => {
  if (currentStep.value < totalSteps.value - 1) {
    changeStep(currentStep.value + 1);
  } else {
    handleFinish();
  }
};

const handleFinish = () => {
  visible.value = false;
  emit("finish");
};

watch(
  () => props.current,
  () => {
    nextTick(() => {
      if (visible.value) updateTargetElement();
    });
  },
  { immediate: true }
);

watch(visible, (newVal) => {
  if (!newVal) {
    document.body.style.overflow = "";
  } else {
    updateTargetElement();
    document.body.style.overflow = "hidden";
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll, true);
  window.removeEventListener("resize", handleResize);
});

const handleScroll = () => {
  if (visible.value && currentTargetElement.value) {
    forceUpdateSpotlight.value++;
  }
};

const handleResize = () => {
  if (visible.value && currentTargetElement.value) {
    updateTargetElement();
    forceUpdateSpotlight.value++;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, true);
  window.addEventListener("resize", handleResize);
});

defineExpose<LbTourInstance>({
  current: currentStep,
  steps: allSteps,
  start: () => {
    visible.value = true;
    currentStep.value = 0;
  },
  close: () => {
    handleClose();
  },
  next: () => {
    handleNext();
  },
  prev: () => {
    handlePrev();
  },
  goTo: (step: number) => {
    changeStep(step);
  },
});
</script>
