<template>
  <div style="display: flex; gap: 10px;">
    <LbButton>
      <template #icon>
        <LbIcon><Search /></LbIcon>
      </template>
      搜索
    </LbButton>
    <LbButton type="primary">
      <template #icon>
        <LbIcon><PencilSharp /></LbIcon>
      </template>
      编辑
    </LbButton>
    <LbButton type="success">
      <template #icon>
        <LbIcon><CheckmarkCircle /></LbIcon>
      </template>
      确认
    </LbButton>
    <LbButton type="danger">
      <template #icon>
        <LbIcon><Trash /></LbIcon>
      </template>
    </LbButton>
    <LbButton type="info">
      <template #icon>
        <LbIcon><InformationCircle /></LbIcon>
      </template>
    </LbButton>
  </div>
</template>

<script setup lang="ts">
import { Search, PencilSharp, CheckmarkCircle, Trash, InformationCircle } from '@vicons/ionicons5';
</script>