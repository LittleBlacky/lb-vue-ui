<template>
  <lb-card>
    <template #header>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span>自定义头部</span>
        <lb-button size="small" type="primary">操作</lb-button>
      </div>
    </template>
    <p>使用具名插槽可以完全自定义头部内容，包括添加按钮、图标等交互元素。</p>
  </lb-card>
</template>
