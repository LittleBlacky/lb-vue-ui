<template>
  <lb-form
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-width="100"
    label-position="right"
  >
    <lb-form-item prop="name" label="姓名">
      <lb-input
        v-model="form.name"
        placeholder="请输入姓名"
        @blur="onBlur('name')"
      />
    </lb-form-item>
    <lb-form-item prop="email" label="邮箱">
      <lb-input
        v-model="form.email"
        placeholder="请输入邮箱"
        @blur="onBlur('email')"
      />
    </lb-form-item>
  </lb-form>
  <div style="display: flex; gap: 10px; margin-top: 10px">
    <lb-button @click="onSubmit">提交</lb-button>
    <lb-button type="plain" @click="onReset">重置</lb-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const formRef = ref<any>();
const form = reactive({ name: "", email: "" });
const rules = {
  name: [
    { required: true, message: "请输入姓名", trigger: ["blur", "change"] },
    { min: 2, message: "至少 2 个字符", trigger: "blur" },
  ],
  email: [{ type: "email", message: "邮箱格式不正确", trigger: "blur" }],
};

const onBlur = (prop: string) => formRef.value?.validateField(prop, "blur");
const onSubmit = async () => {
  const ok = await formRef.value?.validate();
  if (ok) {
    // 提交逻辑
  }
};
const onReset = () => formRef.value?.resetFields();
</script>
