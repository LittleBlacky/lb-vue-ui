<template>
  <lb-form :model="form" :rules="rules" :label-width="100">
    <lb-form-item prop="username" label="用户名" :inline-message="true">
      <lb-input v-model="form.username" placeholder="仅支持字母数字下划线" />
    </lb-form-item>
  </lb-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const form = reactive({ username: "" });

const usernameValidator = (_rule: any, value: string) => {
  if (!value) return Promise.reject("请输入用户名");
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return Promise.reject("仅支持字母、数字与下划线");
  }
  return Promise.resolve();
};

const rules = {
  username: [{ validator: usernameValidator, trigger: ["change", "blur"] }],
};
</script>
