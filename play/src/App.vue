<template>
  <div class="virtual-triggering-demo">
    <lb-button
      v-for="i in 2"
      :key="i"
      type="primary"
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      virtual trigger {{ i }}
    </lb-button>
    <lb-button
      v-for="i in 2"
      :key="i"
      type="warning"
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      virtual trigger {{ i }}
    </lb-button>
    <lb-button
      v-for="i in 2"
      :key="i"
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      virtual trigger {{ i }}
    </lb-button>
    <lb-button
      v-for="i in 2"
      :key="i"
      type="info"
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      virtual trigger {{ i }}
    </lb-button>
    <lb-button
      v-for="i in 2"
      :key="i"
      type="danger"
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      virtual trigger {{ i }}
    </lb-button>
    <lb-button
      v-for="i in 2"
      :key="i"
      plain
      type="primary"
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      virtual trigger {{ i }}
    </lb-button>
    <lb-button
      v-for="i in 2"
      :key="i"
      plain
      type="warning"
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      virtual trigger {{ i }}
    </lb-button>
    <lb-button
      v-for="i in 2"
      :key="i"
      plain
      type="info"
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      virtual trigger {{ i }}
    </lb-button>
    <lb-button
      v-for="i in 2"
      :key="i"
      plain
      type="danger"
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      virtual trigger {{ i }}
    </lb-button>
    <lb-button
      v-for="i in 2"
      :key="i"
      plain
      class="virtual-trigger"
      @mousemove="(e) => (virtualRef = e.currentTarget)"
      @click="visible = !visible"
    >
      virtual trigger {{ i }}
    </lb-button>
    <lb-tooltip
      content="Hello Virtual Trigger"
      virtualTriggering
      v-model:visible="visible"
      :virtualRef="virtualRef"
    >
      <template #content> </template>
    </lb-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
const virtualRef = ref<HTMLElement | undefined>()
</script>

<style scoped>
.virtual-triggering-demo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100px;
}
</style>
