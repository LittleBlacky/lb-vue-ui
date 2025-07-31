<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <lb-input v-model="value" placeholder="复合型输入框">
      <template #prepend>
        <span>Https://</span>
      </template>
      <template #append>
        <lb-button round>
          <lb-icon>
            <Search />
          </lb-icon>
        </lb-button>
      </template>
    </lb-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@vicons/ionicons5";
const value = ref("");
</script>
