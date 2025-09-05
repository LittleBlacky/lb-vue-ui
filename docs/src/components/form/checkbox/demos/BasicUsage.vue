<template>
  <div>
    <LbCheckbox v-model="checked">苹果</LbCheckbox>
    <LbCheckbox v-model="checked2" label="香蕉" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const checked = ref<boolean | null>(false);
const checked2 = ref<boolean | null>(true);
</script>
