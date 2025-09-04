<template>
  <lb-select v-model="selectArr" multiple filterable>
    <lb-select-option
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    ></lb-select-option>
  </lb-select>
</template>

<script setup>
import { ref } from "vue";
const options = ref([
  {
    label: "选项1",
    value: "1",
  },
  {
    label: "选项2",
    value: "2",
  },
]);
const selectArr = ref([]);
</script>
