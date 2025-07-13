<template>
  <div class="button-group">
    <LbButton circle
      ><LbIcon><CheckmarkCircle /></LbIcon
    ></LbButton>
    <LbButton type="primary" circle
      ><LbIcon><CheckmarkCircle /></LbIcon
    ></LbButton>
    <LbButton type="success" circle
      ><LbIcon><CheckmarkCircle /></LbIcon
    ></LbButton>
    <LbButton type="warning" circle
      ><LbIcon><CheckmarkCircle /></LbIcon
    ></LbButton>
    <LbButton type="danger" circle
      ><LbIcon><CheckmarkCircle /></LbIcon
    ></LbButton>
    <LbButton type="info" circle
      ><LbIcon><CheckmarkCircle /></LbIcon
    ></LbButton>
  </div>
  <div class="button-group">
    <LbButton
      ><LbIcon><CheckmarkCircle /></LbIcon>Default</LbButton
    >
    <LbButton type="primary"
      ><LbIcon><CheckmarkCircle /></LbIcon>Priamry</LbButton
    >
    <LbButton type="success"
      ><LbIcon><CheckmarkCircle /></LbIcon>Success</LbButton
    >
    <LbButton type="warning"
      ><LbIcon><CheckmarkCircle /></LbIcon>Warning</LbButton
    >
    <LbButton type="danger"
      ><LbIcon><CheckmarkCircle /></LbIcon>Danger</LbButton
    >
    <LbButton type="info"
      ><LbIcon><CheckmarkCircle /></LbIcon>Info</LbButton
    >
  </div>
</template>

<script setup lang="ts">
import { Search, PencilSharp, CheckmarkCircle, Trash, InformationCircle } from '@vicons/ionicons5';
</script>

<style scoped>
.button-group {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
