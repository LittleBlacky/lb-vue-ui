<template>
  <div class="step-config-demo">
    <lb-button type="primary" @click="startPlacementTour">开始引导</lb-button>

    <div class="demo-content">
      <!-- 位置演示区域 -->
      <div class="demo-section">
        <h4>弹出位置演示</h4>
        <div class="placement-grid">
          <div class="placement-item" id="placement-top">Top</div>
          <div class="placement-item" id="placement-top-start">Top Start</div>
          <div class="placement-item" id="placement-top-end">Top End</div>
          <div class="placement-item" id="placement-bottom">Bottom</div>
          <div class="placement-item" id="placement-bottom-start">
            Bottom Start
          </div>
          <div class="placement-item" id="placement-bottom-end">Bottom End</div>
          <div class="placement-item" id="placement-left">Left</div>
          <div class="placement-item" id="placement-left-start">Left Start</div>
          <div class="placement-item" id="placement-left-end">Left End</div>
          <div class="placement-item" id="placement-right">Right</div>
          <div class="placement-item" id="placement-right-start">
            Right Start
          </div>
          <div class="placement-item" id="placement-right-end">Right End</div>
        </div>
      </div>
    </div>

    <!-- 位置演示引导 -->
    <lb-tour
      v-model="placementTourOpen"
      v-model:current="placementCurrentStep"
      @close="handleTourClose('placement')"
      @finish="handleTourFinish('placement')"
    >
      <lb-tour-step
        target="#placement-top"
        title="Top 位置"
        description="弹出框显示在目标元素上方"
        placement="top"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-top-start"
        title="Top Start 位置"
        description="弹出框显示在目标元素上方左侧"
        placement="top-start"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-top-end"
        title="Top End 位置"
        description="弹出框显示在目标元素上方右侧"
        placement="top-end"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-bottom"
        title="Bottom 位置"
        description="弹出框显示在目标元素下方"
        placement="bottom"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-bottom-start"
        title="Bottom Start 位置"
        description="弹出框显示在目标元素下方左侧"
        placement="bottom-start"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-bottom-end"
        title="Bottom End 位置"
        description="弹出框显示在目标元素下方右侧"
        placement="bottom-end"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-left"
        title="Left 位置"
        description="弹出框显示在目标元素左侧"
        placement="left"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-left-start"
        title="Left Start 位置"
        description="弹出框显示在目标元素左侧上方"
        placement="left-start"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-left-end"
        title="Left End 位置"
        description="弹出框显示在目标元素左侧下方"
        placement="left-end"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-right"
        title="Right 位置"
        description="弹出框显示在目标元素右侧"
        placement="right"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-right-start"
        title="Right Start 位置"
        description="弹出框显示在目标元素右侧上方"
        placement="right-start"
      ></lb-tour-step>
      <lb-tour-step
        target="#placement-right-end"
        title="Right End 位置"
        description="弹出框显示在目标元素右侧下方"
        placement="right-end"
      ></lb-tour-step>
    </lb-tour>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 位置演示
const placementTourOpen = ref(false);
const placementCurrentStep = ref(0);

const startPlacementTour = () => {
  placementTourOpen.value = true;
  placementCurrentStep.value = 0;
};

const handleTourClose = (type) => {
  console.log(`${type} 引导关闭`);
};

const handleTourFinish = (type) => {
  console.log(`${type} 引导完成`);
};
</script>

<style scoped>
.step-config-demo {
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

.demo-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.demo-content {
  max-width: 1000px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h4 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
  text-align: center;
}

.placement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  max-width: 800px;
  margin: 0 auto;
}

.placement-item {
  padding: 15px;
  border: 2px solid #409eff;
  border-radius: 8px;
  background: #f0f9ff;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #409eff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.placement-item:hover {
  background: #409eff;
  color: white;
}

.mask-demo,
.type-demo,
.custom-demo {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.mask-item,
.type-item,
.custom-item {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  text-align: center;
  transition: all 0.3s ease;
}

.mask-item:hover,
.type-item:hover,
.custom-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.mask-item h5,
.type-item h5,
.custom-item h5 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
}

.mask-item p,
.type-item p,
.custom-item p {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.type-item:first-child {
  border-color: #909399;
}

.type-item:last-child {
  border-color: #409eff;
  background: #f0f9ff;
}

.custom-item:first-child {
  border-color: #e6a23c;
  background: #fdf6ec;
}

.custom-item:last-child {
  border-color: #67c23a;
  background: #f0f9ff;
}
</style>
