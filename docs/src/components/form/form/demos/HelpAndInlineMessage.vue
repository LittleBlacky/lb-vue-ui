<template>
  <lb-form :model="form" :rules="rules" :label-width="100">
    <lb-form-item
      prop="password"
      label="密码"
      help="至少 6 位，包含字母和数字"
      :inline-message="true"
    >
      <lb-input v-model="form.password" type="password" />
    </lb-form-item>
  </lb-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const form = reactive({ password: "" });
const rules = {
  password: [
    { min: 6, message: "至少 6 位", trigger: "blur" },
    {
      validator: (_rule: any, value: string) => {
        if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
          return Promise.reject("需包含字母和数字");
        }
        return Promise.resolve();
      },
      trigger: "change",
    },
  ],
};
</script>
