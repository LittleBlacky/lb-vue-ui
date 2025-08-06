<template>
  <div class="tooltip-trigger-demo">
    <lb-tooltip content="Hover to trigger" trigger="hover">
      <lb-button>Hover me</lb-button>
    </lb-tooltip>
    <lb-tooltip content="Click to trigger" trigger="click">
      <lb-button>Click me</lb-button>
    </lb-tooltip>
    <lb-tooltip content="Focus to trigger" trigger="focus">
      <lb-button>Focus me</lb-button>
    </lb-tooltip>
  </div>
</template>

<style scoped>
.tooltip-trigger-demo {
  display: flex;
  gap: 10px;
}
</style>
