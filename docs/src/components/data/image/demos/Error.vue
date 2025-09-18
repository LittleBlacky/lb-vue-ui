<template>
  <div class="demo-container">
    <div class="demo-section">
      <div class="demo-item">
        <h4>错误状态</h4>
        <lb-image :src="errorSrc" width="200" height="150" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const errorSrc = ref("https://invalid-url.com/nonexistent.jpg");
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 50px;
  margin: 20px 0;
}

.demo-item {
  text-align: center;
}

.demo-item h4 {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}
</style>
