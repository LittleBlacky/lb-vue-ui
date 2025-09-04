<template>
  <lb-form :model="form" inline :label-width="100" label-align="right">
    <lb-form-item label="城市">
      <lb-input v-model="form.city" placeholder="城市" />
    </lb-form-item>
    <lb-form-item label="职业">
      <lb-input v-model="form.job" placeholder="职业" />
    </lb-form-item>
    <lb-form-item label="公司">
      <lb-input v-model="form.company" placeholder="公司" />
    </lb-form-item>
  </lb-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const form = reactive({ city: "", job: "", company: "" });
</script>
