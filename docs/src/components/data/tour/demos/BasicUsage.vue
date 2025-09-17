<template>
  <div class="tour-demo">
    <div class="demo-header">
      <h3>基础使用</h3>
      <p>最简单的引导教程使用方式</p>
      <lb-button type="primary" @click="startTour">开始引导</lb-button>
    </div>

    <div class="demo-content">
      <div class="feature-cards">
        <div class="feature-card" id="feature-1">
          <h4>功能一</h4>
          <p>这是第一个功能的介绍</p>
        </div>
        <div class="feature-card" id="feature-2">
          <h4>功能二</h4>
          <p>这是第二个功能的介绍</p>
        </div>
        <div class="feature-card" id="feature-3">
          <h4>功能三</h4>
          <p>这是第三个功能的介绍</p>
        </div>
      </div>
    </div>

    <lb-tour
      v-model="tourOpen"
      :current="currentStep"
      @update:current="currentStep = $event"
      @close="handleClose"
      @finish="handleFinish"
    >
      <lb-tour-step
        target="#feature-1"
        title="欢迎使用"
        description="这是您的第一个功能，点击这里可以开始使用。"
      ></lb-tour-step>
      <lb-tour-step
        target="#feature-2"
        title="探索更多"
        description="这里有更多高级功能等待您的发现。"
        placement="bottom"
      ></lb-tour-step>
      <lb-tour-step
        target="#feature-3"
        title="完成设置"
        description="最后一步，完成您的个人设置。"
        placement="left"
      ></lb-tour-step>
    </lb-tour>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tourOpen = ref(false);
const currentStep = ref(0);

const startTour = () => {
  tourOpen.value = true;
  currentStep.value = 0;
};

const handleClose = () => {
  console.log("引导已关闭");
};

const handleFinish = () => {
  console.log("引导已完成");
};
</script>

<style scoped>
.tour-demo {
  padding: 20px;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
}

.demo-header h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.demo-header p {
  margin: 0 0 20px 0;
  color: #666;
}

.demo-content {
  max-width: 800px;
  margin: 0 auto;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.feature-card {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.feature-card h4 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
}

.feature-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}
</style>
