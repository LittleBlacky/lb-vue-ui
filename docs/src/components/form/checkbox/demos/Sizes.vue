<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <LbCheckbox v-model="s1" size="small">Small</LbCheckbox>
    <LbCheckbox v-model="s2" size="base">Base</LbCheckbox>
    <LbCheckbox v-model="s3" size="large">Large</LbCheckbox>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const s1 = ref<boolean | null>(true);
const s2 = ref<boolean | null>(true);
const s3 = ref<boolean | null>(true);
</script>
