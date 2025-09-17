<template>
  <div>
    <p>滚动到底部时会触发 end-reached 事件：</p>
    <lb-scrollbar height="200px" @end-reached="handleEndReached">
      <div style="padding: 20px">
        <div
          v-for="item in items"
          :key="item"
          style="padding: 10px; border-bottom: 1px solid #eee"
        >
          列表项 {{ item }}
        </div>
        <div
          v-if="loading"
          style="text-align: center; padding: 20px; color: #666"
        >
          加载中...
        </div>
      </div>
    </lb-scrollbar>
    <p style="margin-top: 10px; color: #666">触发次数: {{ endReachedCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const items = ref(Array.from({ length: 20 }, (_, i) => i + 1));
const endReachedCount = ref(0);
const loading = ref(false);

const handleEndReached = () => {
  endReachedCount.value++;

  // 模拟加载更多数据
  if (!loading.value) {
    loading.value = true;
    setTimeout(() => {
      const currentLength = items.value.length;
      const newItems = Array.from(
        { length: 10 },
        (_, i) => currentLength + i + 1
      );
      items.value.push(...newItems);
      loading.value = false;
    }, 1000);
  }
};
</script>
