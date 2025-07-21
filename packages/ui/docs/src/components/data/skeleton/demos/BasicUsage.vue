<template>
  <lb-skeleton :loading="loading">
    <template #template>
      <lb-skeleton-item variant="text" style="width: 50%"></lb-skeleton-item>
      <lb-skeleton-item variant="text" style="width: 80%"></lb-skeleton-item>
    </template>
    <template #default>
      <div>
        <h3>内容已加载</h3>
        <p>这是加载完成后的内容。</p>
      </div>
    </template>
  </lb-skeleton>
  <lb-button @click="toggleLoading" style="margin-top: 20px">切换加载状态</lb-button>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>
