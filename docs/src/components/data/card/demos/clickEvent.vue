<template>
  <lb-card header="可点击卡片" clickable @click="handleCardClick">
    <p>点击此卡片会触发事件</p>
  </lb-card>
</template>

<script setup>
const handleCardClick = (event) => {
  console.log("卡片被点击了", event);
  // 可以在这里处理点击逻辑
};
</script>
