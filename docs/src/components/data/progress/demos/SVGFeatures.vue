<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>SVG 渲染优势</h4>
      <p>
        基于SVG的进度条具有矢量图形的优势，在任何分辨率下都能保持清晰的显示效果。
      </p>
      <div class="svg-features">
        <div class="feature-item">
          <h5>高清显示</h5>
          <p>支持高DPI屏幕，无论缩放多少倍都保持清晰</p>
          <lb-progress type="line" :percentage="65" color="#1890ff" />
        </div>
        <div class="feature-item">
          <h5>平滑动画</h5>
          <p>SVG原生支持CSS动画，过渡效果更加流畅</p>
          <lb-progress
            type="line"
            :percentage="animatedPercentage"
            animated
            background-color="#52c41a"
          />
          <div class="controls">
            <button @click="startAnimation" :disabled="isAnimating">
              开始动画
            </button>
            <button @click="stopAnimation" :disabled="!isAnimating">
              停止动画
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>圆形进度条透明背景</h4>
      <p>
        SVG圆形进度条支持完全透明的背景，中间区域不会被填充颜色，可以完美融入任何背景。
      </p>
      <div class="transparent-demo">
        <div class="background-pattern">
          <lb-progress type="circle" :percentage="70" :width="120" />
          <p>透明背景效果</p>
        </div>
        <div class="colored-background">
          <lb-progress
            type="circle"
            :percentage="85"
            :width="120"
            color="#f5222d"
          />
          <p>彩色背景下的效果</p>
        </div>
        <div class="gradient-background">
          <lb-progress
            type="circle"
            :percentage="60"
            :width="120"
            color="#722ed1"
          />
          <p>渐变背景下的效果</p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>精确的弧形绘制</h4>
      <p>SVG路径绘制确保圆形进度条的弧形精确无误，边缘平滑。</p>
      <div class="arc-demo">
        <div class="arc-item">
          <lb-progress type="circle" :percentage="15" :width="100" />
          <span>15%</span>
        </div>
        <div class="arc-item">
          <lb-progress type="circle" :percentage="45" :width="100" />
          <span>45%</span>
        </div>
        <div class="arc-item">
          <lb-progress type="circle" :percentage="75" :width="100" />
          <span>75%</span>
        </div>
        <div class="arc-item">
          <lb-progress type="circle" :percentage="95" :width="100" />
          <span>95%</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>自定义样式灵活性</h4>
      <p>SVG实现提供了更好的样式自定义能力，支持渐变色、阴影等高级效果。</p>
      <div class="custom-styles">
        <div class="style-item">
          <h5>渐变色进度条</h5>
          <lb-progress
            type="line"
            :percentage="80"
            color="linear-gradient(90deg, #ff6b6b, #4ecdc4)"
          />
        </div>
        <div class="style-item">
          <h5>多色圆形进度条</h5>
          <div class="multi-color-circles">
            <lb-progress
              type="circle"
              :percentage="60"
              color="#ff4d4f"
              :width="80"
            />
            <lb-progress
              type="circle"
              :percentage="60"
              color="#52c41a"
              :width="80"
            />
            <lb-progress
              type="circle"
              :percentage="60"
              color="#1890ff"
              :width="80"
            />
            <lb-progress
              type="circle"
              :percentage="60"
              color="#722ed1"
              :width="80"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { LbProgress } from "@lb-vue-ui/components";

const animatedPercentage = ref(30);
const isAnimating = ref(false);
let animationTimer: number | null = null;

const startAnimation = () => {
  if (isAnimating.value) return;

  isAnimating.value = true;
  let progress = 0;
  const increment = 2;

  animationTimer = setInterval(() => {
    progress += increment;
    animatedPercentage.value = progress;

    if (progress >= 100) {
      progress = 0;
    }
  }, 100);
};

const stopAnimation = () => {
  if (animationTimer) {
    clearInterval(animationTimer);
    animationTimer = null;
  }
  isAnimating.value = false;
};

onUnmounted(() => {
  if (animationTimer) {
    clearInterval(animationTimer);
  }
});
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  margin-bottom: 32px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.demo-section h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.demo-section p {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.svg-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.feature-item {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
}

.feature-item h5 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.feature-item p {
  margin: 0 0 12px 0;
  font-size: 12px;
  color: #6b7280;
}

.controls {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.controls button {
  padding: 4px 12px;
  font-size: 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
}

.controls button:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.transparent-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.background-pattern {
  padding: 20px;
  background: repeating-linear-gradient(
    45deg,
    #f0f0f0,
    #f0f0f0 10px,
    #e0e0e0 10px,
    #e0e0e0 20px
  );
  border-radius: 8px;
  text-align: center;
}

.colored-background {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  text-align: center;
  color: white;
}

.gradient-background {
  padding: 20px;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  border-radius: 8px;
  text-align: center;
}

.arc-demo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.arc-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.arc-item span {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.custom-styles {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.style-item h5 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.multi-color-circles {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
