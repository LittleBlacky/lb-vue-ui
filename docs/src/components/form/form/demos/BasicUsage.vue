<template>
  <lb-form :model="form">
    <lb-form-item label="姓名">
      <lb-input v-model="form.name" placeholder="请输入姓名" />
    </lb-form-item>
    <lb-form-item label="邮箱">
      <lb-input v-model="form.email" placeholder="请输入邮箱" />
    </lb-form-item>
  </lb-form>
  <pre>{{ form }}</pre>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
});
</script>
