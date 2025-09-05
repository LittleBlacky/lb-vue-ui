<template>
  <div>
    <LbCheckboxGroup v-model="fruits" name="fruits">
      <LbCheckbox label="苹果" value="apple" />
      <LbCheckbox label="香蕉" value="banana" />
      <LbCheckbox label="橙子" value="orange" />
      <LbCheckbox label="葡萄" value="grape" />
    </LbCheckboxGroup>
    <div style="margin-top: 8px; font-size: 12px; color: #888">
      已选择：{{ fruits.join(", ") }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const fruits = ref<Array<string | number | boolean>>(["banana", "grape"]);
</script>
