<template>
  <lb-card header="卡片标题" @header-click="handleHeaderClick">
    <p>点击头部会触发事件</p>
  </lb-card>
</template>

<script setup>
const handleHeaderClick = (event) => {
  console.log("头部被点击了", event);
  // 可以在这里处理头部点击逻辑
};
</script>
