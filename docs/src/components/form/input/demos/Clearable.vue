<template>
  <lb-input v-model="value" placeholder="可清空输入框" clearable />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
</script>
