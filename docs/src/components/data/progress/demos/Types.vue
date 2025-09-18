<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>线性进度条</h4>
      <p>基于SVG的线性进度条，提供高质量的渲染效果和平滑的动画过渡。</p>
      <div class="progress-list">
        <div class="progress-item">
          <span class="label">默认样式</span>
          <lb-progress type="line" :percentage="50" />
        </div>
        <div class="progress-item">
          <span class="label">显示文字</span>
          <lb-progress type="line" :percentage="75" show-text />
        </div>
        <div class="progress-item">
          <span class="label">自定义颜色</span>
          <lb-progress type="line" :percentage="60" color="#999" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>圆形进度条</h4>
      <p>
        基于SVG的圆形进度条，支持透明背景和精确的弧形绘制，中间区域完全透明。
      </p>
      <div class="progress-group">
        <div class="progress-item-circle">
          <span class="label">默认样式</span>
          <lb-progress type="circle" :percentage="50" />
        </div>
        <div class="progress-item-circle">
          <span class="label">显示文字</span>
          <lb-progress type="circle" :percentage="75" show-text />
        </div>
        <div class="progress-item-circle">
          <span class="label">自定义颜色</span>
          <lb-progress type="circle" :percentage="60" color="#f5222d" />
        </div>
        <div class="progress-item-circle">
          <span class="label">自定义尺寸</span>
          <lb-progress type="circle" :percentage="80" :width="80" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>不同进度值对比</h4>
      <p>展示线性和圆形进度条在不同进度值下的表现。</p>
      <div class="comparison-group">
        <div class="comparison-item">
          <span class="label">30%</span>
          <div class="progress-pair">
            <lb-progress type="line" :percentage="30" />
            <lb-progress type="circle" :percentage="30" />
          </div>
        </div>
        <div class="comparison-item">
          <span class="label">60%</span>
          <div class="progress-pair">
            <lb-progress type="line" :percentage="60" />
            <lb-progress type="circle" :percentage="60" />
          </div>
        </div>
        <div class="comparison-item">
          <span class="label">90%</span>
          <div class="progress-pair">
            <lb-progress type="line" :percentage="90" />
            <lb-progress type="circle" :percentage="90" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LbProgress } from "@lb-vue-ui/components";
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

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.progress-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.progress-item-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.comparison-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comparison-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.progress-pair {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.label {
  min-width: 80px;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}
</style>
