<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>局部加载</h4>
      <p class="description">
        通过指定 <code>target</code> 参数，可以在指定区域显示加载状态。
      </p>

      <div class="target-areas">
        <div class="target-area" id="target-1">
          <h5>目标区域 1</h5>
          <p>这是第一个目标区域的内容。点击下方按钮在此区域显示加载状态。</p>
          <div class="area-content">
            <div class="mock-data">
              <div class="data-item">数据项 1</div>
              <div class="data-item">数据项 2</div>
              <div class="data-item">数据项 3</div>
            </div>
          </div>
        </div>

        <div class="target-area" id="target-2">
          <h5>目标区域 2</h5>
          <p>这是第二个目标区域的内容。可以独立控制加载状态。</p>
          <div class="area-content">
            <div class="mock-chart">
              <div class="chart-bar" style="height: 60%"></div>
              <div class="chart-bar" style="height: 80%"></div>
              <div class="chart-bar" style="height: 40%"></div>
              <div class="chart-bar" style="height: 90%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <LbButton @click="loadTarget1">加载区域 1</LbButton>
        <LbButton @click="loadTarget2" :style="{ marginLeft: '10px' }"
          >加载区域 2</LbButton
        >
        <LbButton @click="loadBothTargets" :style="{ marginLeft: '10px' }"
          >同时加载两个区域</LbButton
        >
      </div>
    </div>

    <div class="demo-section">
      <h4>表格加载示例</h4>
      <p class="description">在表格容器中显示加载状态的实际应用场景。</p>

      <div class="table-container" id="table-target">
        <table class="demo-table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>年龄</th>
              <th>职业</th>
              <th>城市</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.age }}</td>
              <td>{{ item.job }}</td>
              <td>{{ item.city }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="controls">
        <LbButton @click="refreshTableData">刷新表格数据</LbButton>
        <LbButton @click="loadMoreData" :style="{ marginLeft: '10px' }"
          >加载更多数据</LbButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LbLoading, type LbLoadingInstance } from "@lb-vue-ui/components";

const tableData = ref([
  { id: 1, name: "张三", age: 25, job: "前端工程师", city: "北京" },
  { id: 2, name: "李四", age: 30, job: "后端工程师", city: "上海" },
  { id: 3, name: "王五", age: 28, job: "产品经理", city: "深圳" },
]);

// 加载目标区域 1
const loadTarget1 = () => {
  const instance = LbLoading.service({
    target: "#target-1",
    text: "正在加载数据...",
    background: "rgba(255, 255, 255, 0.8)",
  });

  // 模拟数据加载
  setTimeout(() => {
    instance.close();
  }, 2000);
};

// 加载目标区域 2
const loadTarget2 = () => {
  const instance = LbLoading.service({
    target: "#target-2",
    text: "正在生成图表...",
    background: "rgba(0, 0, 0, 0.1)",
  });

  // 模拟图表生成
  setTimeout(() => {
    instance.close();
  }, 1500);
};

// 同时加载两个区域
const loadBothTargets = () => {
  const instance1 = LbLoading.service({
    target: "#target-1",
    text: "加载中...",
    background: "rgba(255, 255, 255, 0.9)",
  });

  const instance2 = LbLoading.service({
    target: "#target-2",
    text: "处理中...",
    background: "rgba(255, 255, 255, 0.9)",
  });

  // 不同时间关闭
  setTimeout(() => {
    instance1.close();
  }, 1500);

  setTimeout(() => {
    instance2.close();
  }, 2500);
};

// 刷新表格数据
const refreshTableData = () => {
  const instance = LbLoading.service({
    target: "#table-target",
    text: "正在刷新数据...",
    background: "rgba(255, 255, 255, 0.8)",
  });

  // 模拟数据刷新
  setTimeout(() => {
    // 更新数据
    tableData.value = [
      { id: 1, name: "赵六", age: 26, job: "UI设计师", city: "杭州" },
      { id: 2, name: "钱七", age: 32, job: "架构师", city: "广州" },
      { id: 3, name: "孙八", age: 29, job: "测试工程师", city: "成都" },
    ];
    instance.close();
  }, 1800);
};

// 加载更多数据
const loadMoreData = () => {
  const instance = LbLoading.service({
    target: "#table-target",
    text: "正在加载更多...",
    background: "rgba(0, 0, 0, 0.05)",
  });

  // 模拟加载更多
  setTimeout(() => {
    // 添加更多数据
    const newData = [
      {
        id: tableData.value.length + 1,
        name: "周九",
        age: 27,
        job: "运维工程师",
        city: "西安",
      },
      {
        id: tableData.value.length + 2,
        name: "吴十",
        age: 31,
        job: "数据分析师",
        city: "武汉",
      },
    ];
    tableData.value.push(...newData);
    instance.close();
  }, 1200);
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

.target-areas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.target-area {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #fafafa;
  min-height: 200px;
}

.target-area h5 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.target-area p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 13px;
  line-height: 1.4;
}

.area-content {
  flex: 1;
}

.mock-data {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.data-item {
  padding: 8px 12px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  font-size: 13px;
  color: #555;
}

.mock-chart {
  display: flex;
  align-items: end;
  gap: 8px;
  height: 80px;
  padding: 10px 0;
}

.chart-bar {
  flex: 1;
  background: linear-gradient(to top, #409eff, #79bbff);
  border-radius: 2px 2px 0 0;
  min-height: 20px;
}

.table-container {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
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

.controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
