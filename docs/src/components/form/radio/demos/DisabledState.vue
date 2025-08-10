<script setup lang="ts">
import { ref } from "vue";

const radio = ref("Option 1");
</script>

<template>
  <lb-radio-group v-model="radio" disabled name="disabled">
    <lb-radio label="Option 1">Option 1</lb-radio>
    <lb-radio label="Option 2">Option 2</lb-radio>
  </lb-radio-group>
</template>
