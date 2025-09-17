<template>
  <div>
    <h4>固定高度 300px</h4>
    <lb-scrollbar
      height="300px"
      style="border: 1px solid #ddd; margin-bottom: 20px"
    >
      <div style="padding: 20px">
        <p v-for="item in 30" :key="item" style="margin: 10px 0">
          内容行 {{ item }} - 这是一个固定高度为 300px 的滚动容器。
        </p>
      </div>
    </lb-scrollbar>

    <h4>固定高度 150px</h4>
    <lb-scrollbar height="150px" style="border: 1px solid #ddd">
      <div style="padding: 20px">
        <p v-for="item in 15" :key="item" style="margin: 10px 0">
          内容行 {{ item }} - 这是一个固定高度为 150px 的滚动容器。
        </p>
      </div>
    </lb-scrollbar>
  </div>
</template>

<script setup lang="ts">
// 设置高度示例
</script>
