<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <lb-input v-model="value" placeholder="带前缀图标的输入框">
      <template #prefix>
        <lb-icon>
          <Search />
        </lb-icon>
      </template>
    </lb-input>

    <lb-input v-model="value" placeholder="带后缀图标的输入框">
      <template #suffix>
        <lb-icon>
          <Search />
        </lb-icon>
      </template>
    </lb-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@vicons/ionicons5";
const value = ref("");
</script>
