<template>
  <div class="demo-container">
    <h3>文本位置</h3>
    <p>通过 <code>textPosition</code> 属性设置文本的显示位置。</p>

    <div class="demo-section">
      <h4>线性进度条文本位置</h4>
      <lb-progress
        type="line"
        :percentage="50"
        text-position="outside"
        show-text
      />
      <lb-progress
        type="line"
        :percentage="50"
        text-position="inside"
        show-text
      />
    </div>

    <div class="text-info">
      <h4>文本位置说明：</h4>
      <ul>
        <li><strong>outside</strong> - 文本显示在进度条外部（默认）</li>
        <li><strong>inside</strong> - 文本显示在进度条内部</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LbProgress } from "@lb-vue-ui/components";

// 格式化文本函数
const formatText = (percentage: number) => {
  if (percentage < 30) return "开始";
  if (percentage < 70) return "进行中";
  if (percentage < 100) return "即将完成";
  return "已完成";
};
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
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.text-info {
  margin-top: 24px;
  padding: 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.text-info h4 {
  margin: 0 0 12px 0;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.text-info ul {
  margin: 0;
  padding-left: 20px;
  color: #374151;
  font-size: 13px;
}

.text-info li {
  margin-bottom: 4px;
}
</style>
