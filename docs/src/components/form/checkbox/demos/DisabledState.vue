<template>
  <div>
    <LbCheckbox v-model="c1" disabled>禁用未勾选</LbCheckbox>
    <LbCheckbox v-model="c2" disabled>禁用已勾选</LbCheckbox>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const c1 = ref<boolean | null>(false);
const c2 = ref<boolean | null>(true);
</script>
