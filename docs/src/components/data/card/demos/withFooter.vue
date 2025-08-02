<template>
  <lb-card header="带底部的卡片">
    <p>卡片的主要内容区域，可以包含文本、图片、表格等各种内容。</p>
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
