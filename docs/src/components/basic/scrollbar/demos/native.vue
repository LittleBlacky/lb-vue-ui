<template>
  <div>
    <h4>自定义滚动条</h4>
    <lb-scrollbar
      height="150px"
      style="border: 1px solid #ddd; margin-bottom: 20px"
    >
      <div style="padding: 20px">
        <p v-for="item in 20" :key="item" style="margin: 10px 0">
          内容行 {{ item }} - 使用自定义样式的滚动条。
        </p>
      </div>
    </lb-scrollbar>

    <h4>原生滚动条</h4>
    <lb-scrollbar native height="150px" style="border: 1px solid #ddd">
      <div style="padding: 20px">
        <p v-for="item in 20" :key="item" style="margin: 10px 0">
          内容行 {{ item }} - 使用浏览器原生滚动条样式。
        </p>
      </div>
    </lb-scrollbar>
  </div>
</template>

<script setup lang="ts">
// 原生滚动条示例
</script>
