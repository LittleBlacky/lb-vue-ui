<template>
  <div class=".custom-content-demo">
    <lb-tooltip>
      <lb-button class="virtual-trigger">自定义内容</lb-button>
      <template #content>
        <p>Custom Content</p>
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: flex-end;
            gap: 3px;
          "
        >
          <lb-button size="small">取消</lb-button>
          <lb-button size="small" type="primary">确定</lb-button>
        </div>
      </template>
    </lb-tooltip>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.custom-content-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100px;
}
</style>
