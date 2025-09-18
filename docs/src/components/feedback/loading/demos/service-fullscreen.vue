<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>全屏加载</h4>
      <p class="description">
        通过 <code>LbLoading.service()</code> 方法创建全屏加载状态。
      </p>
      <div class="controls">
        <LbButton @click="showFullscreenLoading">显示全屏加载</LbButton>
        <LbButton
          @click="showCustomFullscreenLoading"
          :style="{ marginLeft: '10px' }"
        >
          自定义全屏加载
        </LbButton>
        <LbButton @click="showLoadingWithText" :style="{ marginLeft: '10px' }">
          带文本的加载
        </LbButton>
      </div>
    </div>

    <div class="demo-section">
      <h4>可控制的全屏加载</h4>
      <p class="description">手动控制加载状态的显示和关闭。</p>
      <div class="controls">
        <LbButton
          @click="showControlledLoading"
          :disabled="!!controlledInstance"
        >
          显示加载
        </LbButton>
        <LbButton
          @click="updateLoadingText"
          :disabled="!controlledInstance"
          :style="{ marginLeft: '10px' }"
        >
          更新文本
        </LbButton>
        <LbButton
          @click="closeControlledLoading"
          :disabled="!controlledInstance"
          :style="{ marginLeft: '10px' }"
        >
          关闭加载
        </LbButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LbLoading, type LbLoadingInstance } from "@lb-vue-ui/components";

const controlledInstance = ref<LbLoadingInstance | null>(null);
const textIndex = ref(0);
const texts = ["加载中...", "正在处理数据...", "即将完成...", "请稍候..."];

// 基础全屏加载
const showFullscreenLoading = () => {
  const instance = LbLoading.service({
    text: "加载中...",
  });

  // 3秒后自动关闭
  setTimeout(() => {
    instance.close();
  }, 3000);
};

// 自定义样式的全屏加载
const showCustomFullscreenLoading = () => {
  const instance = LbLoading.service({
    text: "正在处理数据...",
    background: "rgba(0, 0, 0, 0.8)",
    customClass: "custom-loading",
  });

  // 2秒后自动关闭
  setTimeout(() => {
    instance.close();
  }, 2000);
};

// 带自定义文本的加载
const showLoadingWithText = () => {
  const instance = LbLoading.service({
    text: "正在上传文件，请稍候...",
    lock: true,
  });

  // 模拟进度更新
  let progress = 0;
  const timer = setInterval(() => {
    progress += 20;
    instance.setText(`正在上传文件... ${progress}%`);

    if (progress >= 100) {
      clearInterval(timer);
      instance.setText("上传完成！");
      setTimeout(() => {
        instance.close();
      }, 500);
    }
  }, 500);
};

// 显示可控制的加载
const showControlledLoading = () => {
  controlledInstance.value = LbLoading.service({
    text: texts[textIndex.value],
    background: "rgba(0, 0, 0, 0.7)",
  });
};

// 更新加载文本
const updateLoadingText = () => {
  if (controlledInstance.value) {
    textIndex.value = (textIndex.value + 1) % texts.length;
    controlledInstance.value.setText(texts[textIndex.value]);
  }
};

// 关闭可控制的加载
const closeControlledLoading = () => {
  if (controlledInstance.value) {
    controlledInstance.value.close();
    controlledInstance.value = null;
    textIndex.value = 0;
  }
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
}

.demo-section h4 {
  margin-bottom: 10px;
  color: #333;
  font-size: 16px;
}

.description {
  margin-bottom: 15px;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.description code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 13px;
}

.controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

<style>
.custom-loading {
  backdrop-filter: blur(2px);
}
</style>
