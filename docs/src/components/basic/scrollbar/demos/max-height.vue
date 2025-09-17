<template>
  <div>
    <h4>最大高度 200px（内容较少时不会出现滚动条）</h4>
    <lb-scrollbar
      max-height="200px"
      style="border: 1px solid #ddd; margin-bottom: 20px"
    >
      <div style="padding: 20px">
        <p v-for="item in 5" :key="item" style="margin: 10px 0">
          内容行 {{ item }} - 内容较少，不会超过最大高度。
        </p>
      </div>
    </lb-scrollbar>

    <h4>最大高度 200px（内容较多时会出现滚动条）</h4>
    <lb-scrollbar max-height="200px" style="border: 1px solid #ddd">
      <div style="padding: 20px">
        <p v-for="item in 25" :key="item" style="margin: 10px 0">
          内容行 {{ item }} - 内容较多，超过最大高度时会出现滚动条。
        </p>
      </div>
    </lb-scrollbar>
  </div>
</template>

<script setup lang="ts">
// 最大高度示例
</script>
