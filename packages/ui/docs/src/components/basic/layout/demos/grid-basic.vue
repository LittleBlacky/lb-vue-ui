<template>
  <lb-row>
    <lb-col :span="24"><div class="grid-content bg-purple-dark"></div></lb-col>
  </lb-row>
  <lb-row>
    <lb-col :span="12"><div class="grid-content bg-purple"></div></lb-col>
    <lb-col :span="12"><div class="grid-content bg-purple-light"></div></lb-col>
  </lb-row>
  <lb-row>
    <lb-col :span="8"><div class="grid-content bg-purple-dark"></div></lb-col>
    <lb-col :span="8"><div class="grid-content bg-purple"></div></lb-col>
    <lb-col :span="8"><div class="grid-content bg-purple-light"></div></lb-col>
  </lb-row>
  <lb-row>
    <lb-col :span="6"><div class="grid-content bg-purple-dark"></div></lb-col>
    <lb-col :span="6"><div class="grid-content bg-purple"></div></lb-col>
    <lb-col :span="6"><div class="grid-content bg-purple-light"></div></lb-col>
    <lb-col :span="6"><div class="grid-content bg-purple-dark"></div></lb-col>
  </lb-row>
  <lb-row>
    <lb-col :span="4"><div class="grid-content bg-purple-dark"></div></lb-col>
    <lb-col :span="4"><div class="grid-content bg-purple"></div></lb-col>
    <lb-col :span="4"><div class="grid-content bg-purple-light"></div></lb-col>
    <lb-col :span="4"><div class="grid-content bg-purple-dark"></div></lb-col>
    <lb-col :span="4"><div class="grid-content bg-purple"></div></lb-col>
    <lb-col :span="4"><div class="grid-content bg-purple-light"></div></lb-col>
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