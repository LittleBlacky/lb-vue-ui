<template>
  <div class="button-group">
    <LbButton round>Round Button</LbButton>
    <LbButton type="primary" round>Primary Round</LbButton>
    <LbButton type="success" round>Success Round</LbButton>
    <LbButton type="warning" round>Warning Round</LbButton>
    <LbButton type="danger" round>Danger Round</LbButton>
    <LbButton type="info" round>Info Round</LbButton>
  </div>
</template>

<script setup lang="ts">
import { CheckmarkCircle, Trash } from '@vicons/ionicons5';
</script>

<style scoped>
  .button-group {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
</style>