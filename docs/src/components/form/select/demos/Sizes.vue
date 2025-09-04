<template>
  <div style="display: flex; gap: 10px">
    <lb-select v-model="value" placeholder="请选择" size="small">
      <lb-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </lb-select>
    <lb-select v-model="value" placeholder="请选择" size="base">
      <lb-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </lb-select>
    <lb-select v-model="value" placeholder="请选择" size="large">
      <lb-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </lb-select>
  </div>
</template>

<script setup>
import { ref } from "vue";
const value = ref("");
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>
