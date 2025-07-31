<template>
  <lb-input v-model="value" placeholder="禁用状态" disabled />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
</script>
