<template>
  <lb-skeleton animated :loading="true">
    <template #template>
      <lb-skeleton-item variant="circle"></lb-skeleton-item>
      <lb-skeleton-item variant="text" style="width: 60%;"></lb-skeleton-item>
      <lb-skeleton-item variant="text"></lb-skeleton-item>
    </template>
  </lb-skeleton>
</template>