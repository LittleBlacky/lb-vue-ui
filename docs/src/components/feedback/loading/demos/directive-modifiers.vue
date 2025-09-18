<template>
  <div class="demo-container">
    <div class="modifier-demos">
      <div class="demo-item">
        <div class="demo-area">
          <div class="content" v-loading.fullscreen="fullscreenLoading">
            <p>这是一个普通的内容区域</p>
            <p>点击按钮将显示全屏加载状态</p>
            <p>加载状态会覆盖整个页面</p>
          </div>
        </div>
        <div class="demo-controls">
          <LbButton @click="toggleFullscreenLoading">
            {{ fullscreenLoading ? "关闭" : "显示" }} 全屏加载
          </LbButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 基础修饰符状态
const fullscreenLoading = ref(false);

// 切换全屏加载
const toggleFullscreenLoading = () => {
  fullscreenLoading.value = !fullscreenLoading.value;
  if (fullscreenLoading.value) {
    // 3秒后自动关闭
    setTimeout(() => {
      fullscreenLoading.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

/* 修饰符演示样式 */
.modifier-demos,
.advanced-demos,
.practical-demos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.demo-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: white;
}

.demo-item h5 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.demo-area {
  position: relative;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 15px;
  background: #fafafa;
  min-height: 100px;
  margin-bottom: 15px;
}

.demo-area .content {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.demo-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
