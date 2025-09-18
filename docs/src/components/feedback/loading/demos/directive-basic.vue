<template>
  <div class="demo-container">
    <div class="demo-section">
      <div class="directive-demos">
        <div class="demo-item">
          <h5>布尔值控制</h5>
          <div class="demo-area" v-loading="booleanLoading">
            <div class="content">
              <p>这是一个内容区域</p>
              <p>通过布尔值控制加载状态</p>
            </div>
          </div>
          <div class="demo-controls">
            <LbButton @click="booleanLoading = !booleanLoading">
              {{ booleanLoading ? "关闭" : "开启" }} Loading
            </LbButton>
          </div>
        </div>

        <div class="demo-item">
          <h5>字符串文本</h5>
          <div class="demo-area" v-loading="stringLoading">
            <div class="content">
              <p>这是另一个内容区域</p>
              <p>可以直接传入字符串作为加载文本</p>
            </div>
          </div>
          <div class="demo-controls">
            <LbButton @click="toggleStringLoading">
              {{ stringLoading ? "关闭" : "开启" }} Loading
            </LbButton>
            <LbButton
              @click="changeLoadingText"
              :style="{ marginLeft: '10px' }"
            >
              切换文本
            </LbButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 基础指令状态
const booleanLoading = ref(false);
const stringLoading = ref("");

// 文本选项
const loadingTexts = ["加载中...", "正在处理...", "请稍候...", "数据获取中..."];
let textIndex = 0;

// 切换字符串加载
const toggleStringLoading = () => {
  if (stringLoading.value) {
    stringLoading.value = "";
  } else {
    stringLoading.value = loadingTexts[textIndex];
  }
};

// 切换加载文本
const changeLoadingText = () => {
  if (stringLoading.value) {
    textIndex = (textIndex + 1) % loadingTexts.length;
    stringLoading.value = loadingTexts[textIndex];
  }
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h4 {
  margin-bottom: 10px;
  color: #333;
  font-size: 16px;
}

.description {
  margin-bottom: 20px;
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

/* 指令演示样式 */
.directive-demos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.demo-item h5 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.demo-area {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #fafafa;
  min-height: 120px;
  margin-bottom: 15px;
}

.demo-area .content {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.demo-controls {
  display: flex;
  gap: 10px;
}

/* 表格演示样式 */
.table-demo {
  margin-bottom: 30px;
}

.table-container {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.demo-table th,
.demo-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.demo-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.demo-table td {
  color: #555;
  font-size: 13px;
}

.demo-table tr:last-child td {
  border-bottom: none;
}

.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status.active {
  background: #f0f9ff;
  color: #0369a1;
}

.status.inactive {
  background: #fef2f2;
  color: #dc2626;
}

.table-controls {
  display: flex;
  gap: 10px;
}

/* 卡片演示样式 */
.card-demo {
  margin-bottom: 30px;
}

.card-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 15px;
}

.card-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: white;
  transition: box-shadow 0.2s;
}

.card-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-header h6 {
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

.card-tag {
  padding: 4px 8px;
  background: #f0f9ff;
  color: #0369a1;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.card-content {
  margin-bottom: 15px;
}

.card-content p {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.card-controls {
  display: flex;
  gap: 10px;
}
</style>
