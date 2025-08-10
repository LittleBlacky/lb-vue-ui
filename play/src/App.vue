<template>
  <lb-radio-group v-model="radioValue" name="radioGroup1">
    <lb-radio value="1">1</lb-radio>
    <lb-radio value="2">2</lb-radio>
  </lb-radio-group>
  <lb-radio-group v-model="radioValue2" name="radioGroup2">
    <lb-radio value="1">1</lb-radio>
    <lb-radio value="2">2</lb-radio>
  </lb-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radioValue = ref('2')
const radioValue2 = ref('2')
</script>

<style scoped>
.virtual-triggering-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100px;
}
</style>
