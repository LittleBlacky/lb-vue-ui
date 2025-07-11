<template>
  <div style="display: flex; gap: 10px; align-items: center;">
    <LbButton round>圆角按钮</LbButton>
    <LbButton type="primary" round>Primary Round</LbButton>
    <LbButton type="success" circle>
      <template #icon>
        <LbIcon><CheckmarkCircle /></LbIcon>
      </template>
    </LbButton>
    <LbButton type="danger" circle>
      <template #icon>
        <LbIcon><Trash /></LbIcon>
      </template>
    </LbButton>
  </div>
</template>

<script setup lang="ts">
import { CheckmarkCircle, Trash } from '@vicons/ionicons5';
</script>