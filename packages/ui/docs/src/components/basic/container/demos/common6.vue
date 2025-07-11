<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <lb-container>
      <lb-header>Header</lb-header>
      <lb-container>
        <lb-aside width="200px">Aside</lb-aside>
        <lb-main>Main</lb-main>
      </lb-container>
      <lb-footer>Footer</lb-footer>
    </lb-container>
  </div>
</template>

<style lang="scss" scoped>
.lb-header,
.lb-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.lb-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.lb-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 200px;
}

body > .lb-container {
  margin-bottom: 40px;
}
</style>
