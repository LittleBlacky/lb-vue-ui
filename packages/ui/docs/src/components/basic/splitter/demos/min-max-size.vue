<template>
  <lb-splitter style="height: 300px; border: 1px solid #dcdfe6">
    <lb-splitter-panel :min-size="100" :max-size="300">
      <div class="content">Left Panel (min: 100px, max: 300px)</div>
    </lb-splitter-panel>
    <lb-splitter-panel>
      <div class="content">Right Panel</div>
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