<script setup lang="ts">
import { ref } from 'vue'
import { LbInput, LbButton, LbCard } from '../../packages/components/index'
import '../../packages/theme-chalk/src/index.scss'
const value = ref()

const handleCardClick = () => {
  console.log('卡片被点击了！')
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px; padding: 20px">
    <h2>Card 组件测试</h2>

    <!-- 基础卡片 -->
    <lb-card header="基础卡片">
      <p>这是一个基础的卡片组件测试。</p>
    </lb-card>

    <!-- 可点击卡片 -->
    <lb-card
      header="可点击卡片"
      subtitle="点击试试"
      clickable
      shadow="hover"
      @click="handleCardClick"
    >
      <p>这是一个可点击的卡片，鼠标悬停时会有阴影效果。</p>
    </lb-card>

    <!-- 带底部的卡片 -->
    <lb-card header="带底部的卡片">
      <p>这个卡片有底部操作区域。</p>
      <template #footer>
        <div style="text-align: right">
          <lb-button size="small">取消</lb-button>
          <lb-button size="small" type="primary" style="margin-left: 8px">确定</lb-button>
        </div>
      </template>
    </lb-card>

    <!-- 加载状态卡片 -->
    <lb-card header="加载状态" loading>
      <p>这个卡片正在加载中...</p>
    </lb-card>

    <h2>Input 组件测试</h2>
    <lb-input
      type="textarea"
      v-model="value"
      size="large"
      :autosize="{ minRows: 2 }"
      show-word-limit
      maxlength="100"
    >
      <template #prepend>
        <lb-button>hahaha</lb-button>
      </template>
      <template #append>
        <span>.com</span>
      </template>
    </lb-input>
    <lb-input
      type="textarea"
      v-model="value"
      rows="8"
      show-word-limit
      maxlength="100"
      :autosize="{ maxRows: 5 }"
    >
    </lb-input>
    <lb-input type="textarea" v-model="value" rows="8" size="small" show-word-limit maxlength="100">
      <template #prepend>
        <lb-button>hahaha</lb-button>
      </template>
      <template #append>
        <span>.com</span>
      </template>
    </lb-input>
    <lb-input v-model="value" size="small" maxlength="100" show-word-limit></lb-input>
    <lb-input v-model="value" maxlength="100" show-word-limit>
      <template #prepend>
        <lb-button>hahaha</lb-button>
      </template>
      <template #append>
        <span>.com</span>
      </template>
    </lb-input>
    <lb-input v-model="value" maxlength="100" show-word-limit></lb-input>
  </div>
</template>

<style lang="scss"></style>
