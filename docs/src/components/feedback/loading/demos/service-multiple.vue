<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>多个局部加载管理</h4>
      <p class="description">
        演示如何同时管理多个局部加载实例，支持独立控制和批量操作。
      </p>

      <div class="loading-areas">
        <div class="loading-area" id="area-1">
          <h5>区域 1 - 用户列表</h5>
          <div class="area-content">
            <div class="user-list">
              <div class="user-item" v-for="user in users" :key="user.id">
                <div class="avatar">{{ user.name.charAt(0) }}</div>
                <div class="user-info">
                  <div class="name">{{ user.name }}</div>
                  <div class="role">{{ user.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="loading-area" id="area-2">
          <h5>区域 2 - 统计图表</h5>
          <div class="area-content">
            <div class="chart-container">
              <div class="chart-item">
                <div class="chart-label">销售额</div>
                <div class="chart-value">¥128,456</div>
              </div>
              <div class="chart-item">
                <div class="chart-label">订单数</div>
                <div class="chart-value">1,234</div>
              </div>
              <div class="chart-item">
                <div class="chart-label">用户数</div>
                <div class="chart-value">5,678</div>
              </div>
            </div>
          </div>
        </div>

        <div class="loading-area" id="area-3">
          <h5>区域 3 - 消息通知</h5>
          <div class="area-content">
            <div class="message-list">
              <div class="message-item" v-for="msg in messages" :key="msg.id">
                <div class="message-icon">📧</div>
                <div class="message-content">
                  <div class="message-title">{{ msg.title }}</div>
                  <div class="message-time">{{ msg.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <div class="control-group">
          <h6>单独控制</h6>
          <LbButton @click="loadArea1" size="small">加载区域1</LbButton>
          <LbButton @click="loadArea2" size="small">加载区域2</LbButton>
          <LbButton @click="loadArea3" size="small">加载区域3</LbButton>
        </div>

        <div class="control-group">
          <h6>批量操作</h6>
          <LbButton @click="loadAllAreas" type="primary">同时加载所有</LbButton>
          <LbButton @click="loadSequentially">依次加载</LbButton>
          <LbButton @click="closeAllLoading" type="danger">关闭所有</LbButton>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>实例管理</h4>
      <p class="description">查看当前活跃的加载实例，支持独立控制每个实例。</p>

      <div class="instance-manager">
        <div class="instance-list">
          <div v-if="activeInstances.length === 0" class="no-instances">
            暂无活跃的加载实例
          </div>
          <div v-else>
            <div
              v-for="(instance, index) in activeInstances"
              :key="index"
              class="instance-item"
            >
              <div class="instance-info">
                <span class="instance-id">实例 {{ index + 1 }}</span>
                <span class="instance-target">{{ instance.target }}</span>
              </div>
              <div class="instance-actions">
                <LbButton @click="updateInstanceText(instance)" size="small"
                  >更新文本</LbButton
                >
                <LbButton
                  @click="closeInstance(instance, index)"
                  size="small"
                  type="danger"
                  >关闭</LbButton
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LbLoading, type LbLoadingInstance } from "@lb-vue-ui/components";

// 模拟数据
const users = ref([
  { id: 1, name: "张三", role: "前端工程师" },
  { id: 2, name: "李四", role: "后端工程师" },
  { id: 3, name: "王五", role: "产品经理" },
]);

const messages = ref([
  { id: 1, title: "系统更新通知", time: "2小时前" },
  { id: 2, title: "新功能发布", time: "1天前" },
  { id: 3, title: "维护公告", time: "3天前" },
]);

// 实例管理
interface ManagedInstance {
  instance: LbLoadingInstance;
  target: string;
}

const activeInstances = ref<ManagedInstance[]>([]);

// 添加实例到管理列表
const addInstance = (instance: LbLoadingInstance, target: string) => {
  activeInstances.value.push({ instance, target });
};

// 从管理列表移除实例
const removeInstance = (index: number) => {
  activeInstances.value.splice(index, 1);
};

// 加载区域1
const loadArea1 = () => {
  const instance = LbLoading.service({
    target: "#area-1",
    text: "正在加载用户数据...",
    background: "rgba(64, 158, 255, 0.1)",
  });

  addInstance(instance, "区域1 - 用户列表");

  setTimeout(() => {
    instance.close();
    const index = activeInstances.value.findIndex(
      (item) => item.instance === instance
    );
    if (index > -1) removeInstance(index);
  }, 2000);
};

// 加载区域2
const loadArea2 = () => {
  const instance = LbLoading.service({
    target: "#area-2",
    text: "正在生成统计图表...",
    background: "rgba(103, 194, 58, 0.1)",
  });

  addInstance(instance, "区域2 - 统计图表");

  setTimeout(() => {
    instance.close();
    const index = activeInstances.value.findIndex(
      (item) => item.instance === instance
    );
    if (index > -1) removeInstance(index);
  }, 1500);
};

// 加载区域3
const loadArea3 = () => {
  const instance = LbLoading.service({
    target: "#area-3",
    text: "正在获取最新消息...",
    background: "rgba(230, 162, 60, 0.1)",
  });

  addInstance(instance, "区域3 - 消息通知");

  setTimeout(() => {
    instance.close();
    const index = activeInstances.value.findIndex(
      (item) => item.instance === instance
    );
    if (index > -1) removeInstance(index);
  }, 1800);
};

// 同时加载所有区域
const loadAllAreas = () => {
  loadArea1();
  loadArea2();
  loadArea3();
};

// 依次加载
const loadSequentially = () => {
  loadArea1();

  setTimeout(() => {
    loadArea2();
  }, 500);

  setTimeout(() => {
    loadArea3();
  }, 1000);
};

// 关闭所有加载
const closeAllLoading = () => {
  activeInstances.value.forEach((item) => {
    item.instance.close();
  });
  activeInstances.value = [];
};

// 更新实例文本
const updateInstanceText = (managedInstance: ManagedInstance) => {
  const texts = [
    "处理中...",
    "即将完成...",
    "正在优化...",
    "数据同步中...",
    "请稍候...",
  ];
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  managedInstance.instance.setText(randomText);
};

// 关闭指定实例
const closeInstance = (managedInstance: ManagedInstance, index: number) => {
  managedInstance.instance.close();
  removeInstance(index);
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

.loading-areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.loading-area {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: white;
  min-height: 250px;
}

.loading-area h5 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

.area-content {
  height: 180px;
  overflow-y: auto;
}

/* 用户列表样式 */
.user-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 12px;
}

.user-info .name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.user-info .role {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

/* 图表样式 */
.chart-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.chart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
}

.chart-label {
  font-size: 13px;
  color: #666;
}

.chart-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 消息样式 */
.message-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.message-icon {
  font-size: 20px;
  margin-right: 12px;
}

.message-content .message-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.message-content .message-time {
  font-size: 12px;
  color: #999;
}

/* 控制面板样式 */
.controls {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control-group h6 {
  margin: 0;
  font-size: 14px;
  color: #333;
  font-weight: 600;
}

.control-group .lb-button {
  margin-right: 8px;
}

/* 实例管理样式 */
.instance-manager {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #fafafa;
}

.no-instances {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 20px;
}

.instance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  margin-bottom: 10px;
}

.instance-item:last-child {
  margin-bottom: 0;
}

.instance-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.instance-id {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.instance-target {
  font-size: 12px;
  color: #666;
}

.instance-actions {
  display: flex;
  gap: 8px;
}
</style>
