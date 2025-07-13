<template>
  <div class="button-group">
    <LbButton plain>Plain Button</LbButton>
    <LbButton type="primary" plain>Primary Plain</LbButton>
    <LbButton type="success" plain>Success Plain</LbButton>
    <LbButton type="warning" plain>Warning Plain</LbButton>
    <LbButton type="danger" plain>Danger Plain</LbButton>
    <LbButton type="info" plain>Info Plain</LbButton>
  </div>
</template>

<style scoped>
  .button-group {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
</style>