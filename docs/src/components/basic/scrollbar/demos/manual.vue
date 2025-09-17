<template>
  <div>
    <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap">
      <lb-button @click="scrollToTop">滚动到顶部</lb-button>
      <lb-button @click="scrollToBottom" style="margin-left: 10px"
        >滚动到底部</lb-button
      >
      <lb-button @click="scrollToMiddle" style="margin-left: 10px"
        >滚动到中间</lb-button
      >
      <lb-button @click="setScrollTop100" style="margin-left: 10px"
        >设置 scrollTop 为 100</lb-button
      >
    </div>

    <lb-scrollbar
      ref="scrollbarRef"
      height="200px"
      style="border: 1px solid #ddd"
      @scroll="onScroll"
    >
      <div style="padding: 20px">
        <p v-for="item in 50" :key="item" style="margin: 10px 0">
          内容行 {{ item }} - 可以通过按钮控制滚动位置。
        </p>
      </div>
    </lb-scrollbar>

    <div style="margin-top: 10px; color: #666">
      当前滚动位置：scrollTop = {{ scrollTop }}, scrollLeft = {{ scrollLeft }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { LbScrollbarInstance } from "@lb-vue-ui/components";

const scrollbarRef = ref<LbScrollbarInstance>();
const scrollTop = ref(0);
const scrollLeft = ref(0);

const scrollToTop = () => {
  scrollbarRef.value?.scrollTo(0, 0);
};

const scrollToBottom = () => {
  scrollbarRef.value?.scrollTo(0, 999999);
};

const scrollToMiddle = () => {
  scrollbarRef.value?.scrollTo(0, 300);
};

const setScrollTop100 = () => {
  scrollbarRef.value?.setScrollTop(100);
};

const onScroll = (data: { scrollTop: number; scrollLeft: number }) => {
  scrollTop.value = data.scrollTop;
  scrollLeft.value = data.scrollLeft;
};
</script>
