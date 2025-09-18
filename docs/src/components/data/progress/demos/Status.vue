<template>
  <div class="demo-container">
    <h3>不同状态</h3>
    <p>通过 <code>status</code> 属性设置进度条的状态，不同状态有不同的颜色。</p>

    <div class="demo-section">
      <h4>线性进度条状态</h4>
      <lb-progress type="line" :percentage="50" status="info" />
      <lb-progress type="line" :percentage="50" status="success" />
      <lb-progress type="line" :percentage="50" status="warning" />
      <lb-progress type="line" :percentage="50" status="danger" />
    </div>

    <div class="demo-section">
      <h4>圆形进度条状态</h4>
      <div class="progress-group">
        <lb-progress type="circle" :percentage="50" status="info" />
        <lb-progress type="circle" :percentage="50" status="success" />
        <lb-progress type="circle" :percentage="50" status="warning" />
        <lb-progress type="circle" :percentage="50" status="danger" />
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

.lb-progress:last-child {
  margin-bottom: 0;
}

.progress-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.status-info {
  margin-top: 24px;
  padding: 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.status-info h4 {
  margin: 0 0 12px 0;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.status-info ul {
  margin: 0;
  padding-left: 20px;
  color: #374151;
  font-size: 13px;
}

.status-info li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.status-dot.info {
  background-color: #409eff;
}

.status-dot.success {
  background-color: #67c23a;
}

.status-dot.warning {
  background-color: #e6a23c;
}

.status-dot.exception {
  background-color: #f56c6c;
}
</style>
