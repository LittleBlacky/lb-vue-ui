<template>
  <lb-card header="可点击卡片" clickable @click="handleCardClick">
    <p>点击此卡片会触发点击事件，鼠标悬停时会有视觉反馈。</p>
  </lb-card>
</template>

<script setup>
const handleCardClick = () => {
  console.log("卡片被点击了");
};
</script>
