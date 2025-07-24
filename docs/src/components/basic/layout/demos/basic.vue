<template>
  <lb-container>
    <lb-header>Header</lb-header>
    <lb-main>Main</lb-main>
  </lb-container>

  <lb-container>
    <lb-header>Header</lb-header>
    <lb-main>Main</lb-main>
    <lb-footer>Footer</lb-footer>
  </lb-container>

  <lb-container>
    <lb-aside width="200px">Aside</lb-aside>
    <lb-main>Main</lb-main>
  </lb-container>

  <lb-container>
    <lb-header>Header</lb-header>
    <lb-aside width="200px">Aside</lb-aside>
    <lb-main>Main</lb-main>
  </lb-container>

  <lb-container>
    <lb-aside width="200px">Aside</lb-aside>
    <lb-container>
      <lb-header>Header</lb-header>
      <lb-main>Main</lb-main>
    </lb-container>
  </lb-container>

  <lb-container>
    <lb-aside width="200px">Aside</lb-aside>
    <lb-container>
      <lb-header>Header</lb-header>
      <lb-main>Main</lb-main>
      <lb-footer>Footer</lb-footer>
    </lb-container>
  </lb-container>

  <lb-container>
    <lb-header>Header</lb-header>
    <lb-container>
      <lb-aside width="200px">Aside</lb-aside>
      <lb-main>Main</lb-main>
    </lb-container>
    <lb-footer>Footer</lb-footer>
  </lb-container>
</template>

<style lang="scss" scoped>
.lb-container {
  margin-bottom: 20px;
}

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
  line-height: 160px;
}

body > .lb-container {
  margin-bottom: 40px;
}
</style>