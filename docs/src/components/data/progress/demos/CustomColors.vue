<template>
  <div class="progress-demo">
    <div class="demo-section">
      <h3>单色进度条</h3>
      <lb-progress type="line" :percentage="50" color="#ff6b6b" />
    </div>

    <div class="demo-section">
      <h3>自定义进度颜色数组</h3>
      <div class="demo-item">
        <p>
          {{ colorArray[currentColorIndex].percentage }} % -
          {{ colorArray[currentColorIndex].color }}
        </p>
        <lb-progress
          type="line"
          :percentage="colorArray[currentColorIndex].percentage"
          :color="colorArray[currentColorIndex].color"
        />
        <lb-button @click="nextPercentage">下一个</lb-button>
      </div>
    </div>

    <div class="demo-section">
      <h3>函数颜色</h3>
      <lb-progress type="line" :percentage="75" :color="customColorFunction" />
    </div>

    <div class="demo-section">
      <h3>圆形进度条 - 颜色数组</h3>
      <div class="circle-demo">
        <lb-progress type="circle" :percentage="25" :color="colorArray" />
        <lb-progress type="circle" :percentage="55" :color="colorArray" />
        <lb-progress type="circle" :percentage="85" :color="colorArray" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Element-Plus风格的颜色数组
const colorArray = [
  { color: "#f56c6c", percentage: 30 },
  { color: "#e6a23c", percentage: 70 },
  { color: "#67c23a", percentage: 100 },
];

// 下一个颜色
let currentColorIndex = ref(0);
const nextPercentage = () => {
  currentColorIndex.value = (currentColorIndex.value + 1) % colorArray.length;
};

// 函数颜色
const customColorFunction = (percentage: number) => {
  if (percentage < 30) {
    return "#67c23a";
  } else if (percentage < 70) {
    return "#e6a23c";
  } else {
    return "#f56c6c";
  }
};
</script>

<style scoped>
.progress-demo {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
}

.demo-section h3 {
  margin-bottom: 15px;
  color: #333;
  font-size: 16px;
}

.demo-item {
  margin-bottom: 15px;
}

.demo-item p {
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.circle-demo {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
