<template>
  <div>
    <h4>默认行为（鼠标悬停时显示）</h4>
    <lb-scrollbar
      height="150px"
      style="border: 1px solid #ddd; margin-bottom: 20px"
    >
      <div style="padding: 20px">
        <p v-for="item in 15" :key="item" style="margin: 10px 0">
          内容行 {{ item }} - 鼠标悬停时显示滚动条。
        </p>
      </div>
    </lb-scrollbar>

    <h4>总是显示滚动条</h4>
    <lb-scrollbar always height="150px" style="border: 1px solid #ddd">
      <div style="padding: 20px">
        <p v-for="item in 15" :key="item" style="margin: 10px 0">
          内容行 {{ item }} - 滚动条始终可见。
        </p>
      </div>
    </lb-scrollbar>
  </div>
</template>

<script setup lang="ts">
// 总是显示滚动条示例
</script>
