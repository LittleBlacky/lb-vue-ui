<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>不同进度值</h4>
      <p>展示不同进度值的效果，从0%到100%。</p>
      <div class="progress-list">
        <div class="progress-item">
          <span class="label">0%</span>
          <lb-progress :percentage="0" />
        </div>
        <div class="progress-item">
          <span class="label">25%</span>
          <lb-progress :percentage="25" />
        </div>
        <div class="progress-item">
          <span class="label">50%</span>
          <lb-progress :percentage="50" />
        </div>
        <div class="progress-item">
          <span class="label">75%</span>
          <lb-progress :percentage="75" />
        </div>
        <div class="progress-item">
          <span class="label">100%</span>
          <lb-progress :percentage="100" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>自定义宽度和高度</h4>
      <p>SVG实现支持灵活的尺寸自定义。</p>
      <div class="progress-list">
        <div class="progress-item">
          <span class="label">默认尺寸</span>
          <lb-progress :percentage="60" />
        </div>
        <div class="progress-item">
          <span class="label">自定义宽度</span>
          <lb-progress :percentage="60" :width="300" />
        </div>
        <div class="progress-item">
          <span class="label">自定义高度</span>
          <lb-progress :percentage="60" :height="12" />
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
  gap: 12px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  min-width: 80px;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.lb-progress {
  margin-bottom: 12px;
}

.lb-progress:last-child {
  margin-bottom: 0;
}
</style>
