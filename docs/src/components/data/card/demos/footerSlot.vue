<template>
  <lb-card header="卡片标题">
    <p>卡片内容</p>
    <template #footer>
      <div style="text-align: right; display: flex; justify-content: flex-end">
        <lb-button size="small">取消</lb-button>
        <lb-button size="small" type="primary" style="margin-left: 8px"
          >确定</lb-button
        >
      </div>
    </template>
  </lb-card>
</template>
