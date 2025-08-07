<template>
  <div class="virtual-triggering-demo">
    <lb-button
      v-for="i in 2"
      :key="i"
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      Click me {{ i }}
    </lb-button>
    <lb-tooltip
      content="Hello Virtual Trigger"
      virtualTriggering
      :visible="visible"
      :virtualRef="virtualRef"
    ></lb-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const visible = ref(false);
const virtualRef = ref<HTMLElement | undefined>();
</script>

<style scoped>
.virtual-triggering-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100px;
}
</style>
