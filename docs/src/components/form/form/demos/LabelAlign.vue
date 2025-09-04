<template>
  <div style="display: flex; gap: 10px; margin-bottom: 10px">
    <lb-button @click="labelPosition = 'left'">左对齐</lb-button>
    <lb-button @click="labelPosition = 'right'">右对齐</lb-button>
    <lb-button @click="labelPosition = 'top'">顶部标签</lb-button>
  </div>
  <lb-form :model="form" :label-width="120" :label-position="labelPosition">
    <lb-form-item label="左对齐">
      <lb-input v-model="form.left" />
    </lb-form-item>
    <lb-form-item label="右对齐">
      <lb-input v-model="form.right" />
    </lb-form-item>
    <lb-form-item label="顶部标签">
      <template #default>
        <lb-input v-model="form.top" />
      </template>
    </lb-form-item>
  </lb-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
const labelPosition = ref("right");
const form = reactive({ left: "", right: "", top: "" });
</script>
