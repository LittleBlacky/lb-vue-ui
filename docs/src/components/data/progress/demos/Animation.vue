<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>基础动画</h4>
      <lb-progress type="line" :percentage="currentPercentage" animated />
      <div class="controls">
        <lb-button @click="setPercentage(0)">0%</lb-button>
        <lb-button @click="setPercentage(25)">25%</lb-button>
        <lb-button @click="setPercentage(50)">50%</lb-button>
        <lb-button @click="setPercentage(75)">75%</lb-button>
        <lb-button @click="setPercentage(100)">100%</lb-button>
      </div>
    </div>

    <div class="demo-section">
      <h4>自定义动画持续时间</h4>
      <lb-progress
        type="line"
        :percentage="currentPercentage2"
        animated
        :duration="1000"
      />
      <div class="controls">
        <lb-button @click="setPercentage2(0)">0%</lb-button>
        <lb-button @click="setPercentage2(50)">50%</lb-button>
        <lb-button @click="setPercentage2(100)">100%</lb-button>
      </div>
    </div>

    <div class="demo-section">
      <h4>圆形进度条动画</h4>
      <div class="progress-group">
        <lb-progress type="circle" :percentage="currentPercentage3" animated />
        <lb-progress
          type="circle"
          :percentage="currentPercentage3"
          animated
          :duration="2000"
        />
      </div>
      <div class="controls">
        <lb-button @click="setPercentage3(0)">0%</lb-button>
        <lb-button @click="setPercentage3(30)">30%</lb-button>
        <lb-button @click="setPercentage3(60)">60%</lb-button>
        <lb-button @click="setPercentage3(90)">90%</lb-button>
      </div>
    </div>

    <div class="demo-section">
      <h4>自动进度演示</h4>
      <lb-progress
        type="line"
        :percentage="autoPercentage"
        animated
        :duration="500"
      />
      <div class="controls">
        <lb-button @click="startAutoProgress" :disabled="isAutoRunning">
          {{ isAutoRunning ? "运行中..." : "开始自动进度" }}
        </lb-button>
        <lb-button @click="stopAutoProgress" :disabled="!isAutoRunning">
          停止
        </lb-button>
      </div>
    </div>

    <div class="animation-info">
      <h4>动画效果说明：</h4>
      <ul>
        <li><strong>animated</strong> - 启用动画效果</li>
        <li><strong>duration</strong> - 设置动画持续时间（毫秒）</li>
        <li>
          <strong>缓动函数</strong> - 使用 ease-out 缓动函数，让动画更自然
        </li>
        <li>
          <strong>requestAnimationFrame</strong> -
          使用浏览器原生动画API，性能更好
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { LbProgress, LbButton } from "@lb-vue-ui/components";

const currentPercentage = ref(50);
const currentPercentage2 = ref(50);
const currentPercentage3 = ref(50);
const currentPercentage4 = ref(50);
const autoPercentage = ref(0);
const isAutoRunning = ref(false);

let autoInterval: number | null = null;

const setPercentage = (value: number) => {
  currentPercentage.value = value;
};

const setPercentage2 = (value: number) => {
  currentPercentage2.value = value;
};

const setPercentage3 = (value: number) => {
  currentPercentage3.value = value;
};

const setPercentage4 = (value: number) => {
  currentPercentage4.value = value;
};

const startAutoProgress = () => {
  if (isAutoRunning.value) return;

  isAutoRunning.value = true;
  autoPercentage.value = 0;

  autoInterval = setInterval(() => {
    autoPercentage.value += 2;
    if (autoPercentage.value >= 100) {
      stopAutoProgress();
    }
  }, 100);
};

const stopAutoProgress = () => {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
  }
  isAutoRunning.value = false;
};

onUnmounted(() => {
  stopAutoProgress();
});
</script>

<style scoped>
.demo-container {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}

h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

p {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}

code {
  background-color: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 13px;
  color: #e11d48;
}

.demo-section {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.demo-section h4 {
  margin: 0 0 12px 0;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.lb-progress {
  margin-bottom: 12px;
}

.controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.progress-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 12px;
}

.animation-info {
  margin-top: 24px;
  padding: 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.animation-info h4 {
  margin: 0 0 12px 0;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.animation-info ul {
  margin: 0;
  padding-left: 20px;
  color: #374151;
  font-size: 13px;
}

.animation-info li {
  margin-bottom: 4px;
}
</style>
