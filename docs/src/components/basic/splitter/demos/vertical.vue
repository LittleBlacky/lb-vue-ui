<template>
  <lb-splitter direction="vertical" style="height: 300px; border: 1px solid #dcdfe6">
    <lb-splitter-panel>
      <div class="content">Top</div>
    </lb-splitter-panel>
    <lb-splitter-panel>
      <div class="content">Bottom</div>
    </lb-splitter-panel>
  </lb-splitter>
</template>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f0f2f5;
}
</style>
