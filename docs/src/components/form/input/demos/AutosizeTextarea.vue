<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <lb-input
      v-model="content"
      type="textarea"
      placeholder="自适应高度文本域"
      :autosize="{ minRows: 2, maxRows: 4 }"
    />

    <lb-input
      v-model="content2"
      type="textarea"
      placeholder="简单自适应"
      autosize
      class="mt-4"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const content = ref("");
const content2 = ref("");
</script>
