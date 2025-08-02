<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    "
  >
    <!-- 产品卡片 -->
    <lb-card
      header="产品信息"
      subtitle="¥299.00"
      clickable
      shadow="hover"
      @click="handleProductClick"
    >
      <div style="text-align: center; margin-bottom: 16px">
        <div
          style="
            width: 100px;
            height: 100px;
            background: #f0f0f0;
            border-radius: 8px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
          "
        >
          产品图片
        </div>
      </div>
      <p style="margin: 0 0 16px 0">
        这是一个高质量的产品，具有优秀的性能和设计。
      </p>
      <template #footer>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <span style="color: #999; font-size: 14px">库存: 50</span>
          <lb-button size="small" type="primary">立即购买</lb-button>
        </div>
      </template>
    </lb-card>

    <!-- 用户信息卡片 -->
    <lb-card header="用户信息" :bordered="false" backgroundColor="#f8f9fa">
      <div style="display: flex; align-items: center; margin-bottom: 16px">
        <div
          style="
            width: 60px;
            height: 60px;
            background: #409eff;
            border-radius: 50%;
            margin-right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
          "
        >
          用户
        </div>
        <div>
          <h4 style="margin: 0 0 4px 0">张三</h4>
          <p style="margin: 0; color: #666; font-size: 14px">前端开发工程师</p>
        </div>
      </div>
      <p style="margin: 0; color: #666">
        拥有5年前端开发经验，擅长Vue.js、React等前端技术栈。
      </p>
    </lb-card>

    <!-- 统计卡片 -->
    <lb-card header="数据统计" shadow="always" :radius="12">
      <div
        style="display: flex; justify-content: space-around; text-align: center"
      >
        <div>
          <div style="font-size: 24px; font-weight: bold; color: #409eff">
            1,234
          </div>
          <div style="font-size: 14px; color: #666">总用户数</div>
        </div>
        <div>
          <div style="font-size: 24px; font-weight: bold; color: #67c23a">
            567
          </div>
          <div style="font-size: 14px; color: #666">活跃用户</div>
        </div>
        <div>
          <div style="font-size: 24px; font-weight: bold; color: #e6a23c">
            89%
          </div>
          <div style="font-size: 14px; color: #666">满意度</div>
        </div>
      </div>
    </lb-card>

    <!-- 设置卡片 -->
    <lb-card header="系统设置">
      <div style="margin-bottom: 16px">
        <label style="display: block; margin-bottom: 8px; font-weight: 500"
          >通知设置</label
        >
        <div style="display: flex; align-items: center; margin-bottom: 8px">
          <input type="checkbox" id="email" style="margin-right: 8px" />
          <label for="email" style="margin: 0">邮件通知</label>
        </div>
        <div style="display: flex; align-items: center">
          <input type="checkbox" id="sms" style="margin-right: 8px" />
          <label for="sms" style="margin: 0">短信通知</label>
        </div>
      </div>
      <template #footer>
        <div style="text-align: right">
          <lb-button size="small" style="margin-right: 8px">重置</lb-button>
          <lb-button size="small" type="primary">保存</lb-button>
        </div>
      </template>
    </lb-card>
  </div>
</template>

<script setup>
const handleProductClick = () => {
  console.log("产品卡片被点击");
};
</script>
