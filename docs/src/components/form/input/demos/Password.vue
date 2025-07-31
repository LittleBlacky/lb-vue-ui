<template>
  <lb-input
    v-model="password"
    type="password"
    placeholder="请输入密码"
    show-password
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const password = ref("");
</script>
