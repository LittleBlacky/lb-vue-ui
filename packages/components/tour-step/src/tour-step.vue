<template>
  <!-- TourStep 组件不渲染任何内容，仅用于注册步骤 -->
</template>

<script setup lang="ts">
import {
  inject,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  watch,
} from "vue";
import type { LbTourStepProps } from "./types";
import type { LbTourStepConfig } from "@lb-vue-ui/components";

defineOptions({
  name: "LbTourStep",
});

const props = withDefaults(defineProps<LbTourStepProps>(), {
  target: "",
  title: "",
  description: "",
  cover: "",
  placement: "top",
  mask: true,
  type: "default",
});

const registerStep =
  inject<(step: LbTourStepConfig, uid: number) => void>("tour-register-step");
const unregisterStep = inject<(uid: number) => void>("tour-unregister-step");

const instance = getCurrentInstance();
const uid = instance?.uid || 0;

const createStepConfig = (): LbTourStepConfig => ({
  target: props.target,
  title: props.title,
  description: props.description,
  cover: props.cover,
  placement: props.placement,
  mask: props.mask,
  type: props.type,
});

const doRegisterStep = () => {
  if (registerStep) {
    const stepConfig = createStepConfig();
    registerStep(stepConfig, uid);
  }
};

const doUnregisterStep = () => {
  if (unregisterStep) {
    unregisterStep(uid);
  }
};

watch(
  () => [
    props.target,
    props.title,
    props.description,
    props.cover,
    props.placement,
    props.mask,
    props.type,
  ],
  () => {
    doUnregisterStep();
    doRegisterStep();
  },
  { deep: true }
);

onMounted(() => {
  doRegisterStep();
});

onBeforeUnmount(() => {
  doUnregisterStep();
});
</script>
