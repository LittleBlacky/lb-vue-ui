<script setup lang="ts">
import { ref } from "vue";
const radioSmall = ref("Option 1");
const radioBase = ref("Option 1");
const radioLarge = ref("Option 1");
</script>

<template>
  <lb-radio-group v-model="radioSmall" size="small" name="small">
    <lb-radio label="Option 1">Option 1</lb-radio>
    <lb-radio label="Option 2">Option 2</lb-radio>
  </lb-radio-group>

  <div style="margin-top: 20px"></div>

  <lb-radio-group v-model="radioBase" size="base" name="base">
    <lb-radio label="Option 1">Option 1</lb-radio>
    <lb-radio label="Option 2">Option 2</lb-radio>
  </lb-radio-group>

  <div style="margin-top: 20px"></div>

  <lb-radio-group v-model="radioLarge" size="large" name="large">
    <lb-radio label="Option 1">Option 1</lb-radio>
    <lb-radio label="Option 2">Option 2</lb-radio>
  </lb-radio-group>
</template>
