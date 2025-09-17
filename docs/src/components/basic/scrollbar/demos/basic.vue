<template>
  <lb-scrollbar height="200px">
    <div style="padding: 20px">
      <p v-for="item in 20" :key="item" style="margin: 10px 0">
        这是第 {{ item }} 行内容，用于演示滚动条的基本功能。
      </p>
    </div>
  </lb-scrollbar>
</template>

<script setup lang="ts">
// 基本用法示例
</script>
