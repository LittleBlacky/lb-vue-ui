<template>
  <transition name="lb-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="lb-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]"
    >
      <div class="lb-loading-spinner">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="lb-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { loadingProps } from "./types";

defineOptions({
  name: "LbLoading",
});

const props = defineProps(loadingProps);

const visible = ref(false);

const handleAfterLeave = () => {
  // emit('after-leave');
};

onMounted(() => {
  visible.value = true;
});

const close = () => {
  visible.value = false;
};

const setText = (val: string) => {
  props.text = val;
};

defineExpose({
  close,
  setText,
});
</script>
