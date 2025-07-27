<template>
  <div class="button-group">
    <LbButton>Default Button</LbButton>
    <LbButton type="primary">Primary Button</LbButton>
    <LbButton type="success">Success Button</LbButton>
    <LbButton type="warning">Warning Button</LbButton>
    <LbButton type="danger">Danger Button</LbButton>
    <LbButton type="info">Info Button</LbButton>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.button-group {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
