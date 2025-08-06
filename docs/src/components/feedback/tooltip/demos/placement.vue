<template>
  <div class="tooltip-placement-demo">
    <div class="row row_top">
      <lb-tooltip content="top-start" placement="top-start">
        <lb-button>top-start</lb-button>
      </lb-tooltip>
      <lb-tooltip content="top" placement="top">
        <lb-button>top</lb-button>
      </lb-tooltip>
      <lb-tooltip content="top-end" placement="top-end">
        <lb-button>top-end</lb-button>
      </lb-tooltip>
    </div>
    <div class="row">
      <lb-tooltip content="left-start" placement="left-start">
        <lb-button>left-start</lb-button>
      </lb-tooltip>
      <lb-tooltip content="right-start" placement="right-start">
        <lb-button>right-start</lb-button>
      </lb-tooltip>
    </div>
    <div class="row">
      <lb-tooltip content="left" placement="left">
        <lb-button>left</lb-button>
      </lb-tooltip>
      <lb-tooltip content="right" placement="right">
        <lb-button>right</lb-button>
      </lb-tooltip>
    </div>
    <div class="row">
      <lb-tooltip content="left-end" placement="left-end">
        <lb-button>left-end</lb-button>
      </lb-tooltip>
      <lb-tooltip content="right-end" placement="right-end">
        <lb-button>right-end</lb-button>
      </lb-tooltip>
    </div>
    <div class="row row_bottom">
      <lb-tooltip content="bottom-start" placement="bottom-start">
        <lb-button>bottom-start</lb-button>
      </lb-tooltip>
      <lb-tooltip content="bottom" placement="bottom">
        <lb-button>bottom</lb-button>
      </lb-tooltip>
      <lb-tooltip content="bottom-end" placement="bottom-end">
        <lb-button>bottom-end</lb-button>
      </lb-tooltip>
    </div>
  </div>
</template>

<style scoped>
.tooltip-placement-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
}
.lb-button {
  margin: 0 5px;
  width: 100px;
}
.row_top,
.row_bottom {
  justify-content: center;
}
</style>
