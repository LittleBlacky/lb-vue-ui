<script setup lang="ts">
import { ref } from "vue";
const radio1 = ref("Option 1");
</script>

<template>
  <lb-radio-group v-model="radio1" name="baseUsage">
    <lb-radio label="Option 1" v-model="radio1">Option 1</lb-radio>
    <lb-radio label="Option 2" v-model="radio1">Option 2</lb-radio>
  </lb-radio-group>
</template>
