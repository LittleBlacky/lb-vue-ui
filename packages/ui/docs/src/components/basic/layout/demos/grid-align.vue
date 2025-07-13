<template>
  <lb-row justify="center">
    <lb-col :span="6"><div class="grid-content bg-purple"></div></lb-col>
    <lb-col :span="6"><div class="grid-content bg-purple-light"></div></lb-col>
  </lb-row>
  <lb-row justify="end">
    <lb-col :span="6"><div class="grid-content bg-purple"></div></lb-col>
    <lb-col :span="6"><div class="grid-content bg-purple-light"></div></lb-col>
  </lb-row>
  <lb-row justify="space-between">
    <lb-col :span="6"><div class="grid-content bg-purple"></div></lb-col>
    <lb-col :span="6"><div class="grid-content bg-purple-light"></div></lb-col>
  </lb-row>
  <lb-row justify="space-around">
    <lb-col :span="6"><div class="grid-content bg-purple"></div></lb-col>
    <lb-col :span="6"><div class="grid-content bg-purple-light"></div></lb-col>
  </lb-row>
</template>

<style lang="scss" scoped>
.lb-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.lb-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>