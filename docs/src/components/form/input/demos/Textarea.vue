<template>
  <lb-input
    v-model="content"
    type="textarea"
    placeholder="请输入多行文本"
    :rows="3"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const content = ref("");
</script>
