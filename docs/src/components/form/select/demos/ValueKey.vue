<template>
  <lb-select v-model="selectValue" value-key="id">
    <lb-select-option
      v-for="option in options"
      :key="option.id"
      :label="option.name"
      :value="option"
    ></lb-select-option>
  </lb-select>
  <span>选中的值: {{ selectValue }}</span>
</template>
<script setup>
import { ref } from "vue";
const selectValue = ref("");
const options = ref([
  {
    id: 1,
    name: "选项1",
  },
  {
    id: 2,
    name: "选项2",
  },
]);
</script>
