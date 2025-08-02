<script setup lang="ts">
import { ref } from 'vue'
import { LbInput, LbButton } from '../../packages/components/index'
import '../../packages/theme-chalk/src/index.scss'
const value = ref()
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <lb-input
      type="textarea"
      v-model="value"
      size="large"
      :autosize="{ minRows: 2 }"
      show-word-limit
      maxlength="100"
    >
      <template #prepend>
        <lb-button>hahaha</lb-button>
      </template>
      <template #append>
        <span>.com</span>
      </template>
    </lb-input>
    <lb-input
      type="textarea"
      v-model="value"
      rows="8"
      show-word-limit
      maxlength="100"
      :autosize="{ maxRows: 5 }"
    >
    </lb-input>
    <lb-input type="textarea" v-model="value" rows="8" size="small" show-word-limit maxlength="100">
      <template #prepend>
        <lb-button>hahaha</lb-button>
      </template>
      <template #append>
        <span>.com</span>
      </template>
    </lb-input>
    <lb-input v-model="value" size="small" maxlength="100" show-word-limit></lb-input>
    <lb-input v-model="value" maxlength="100" show-word-limit>
      <template #prepend>
        <lb-button>hahaha</lb-button>
      </template>
      <template #append>
        <span>.com</span>
      </template>
    </lb-input>
    <lb-input v-model="value" maxlength="100" show-word-limit></lb-input>
  </div>
</template>

<style lang="scss"></style>
