<template>
  <lb-skeleton :rows="3" :count="2" :loading="loading" animated>
    <template #template>
      <div style="display: flex; align-items: center; gap: 10px">
        <lb-skeleton-item variant="image" />
        <div style="flex: 1; display: flex; flex-direction: column">
          <lb-skeleton-item variant="text" style="width: 13%" />
          <lb-skeleton-item variant="text" style="width: 33%" />
        </div>
      </div>
      <lb-skeleton-item variant="text" style="width: 50%" />
      <lb-skeleton-item variant="text" />
    </template>
    <template #default>
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; gap: 10px; align-items: center">
          <img
            src="https://ts1.tc.mm.bing.net/th/id/R-C.6f18e58bf3bacbcee226cb76dfc089a3?rik=61%2bMLnhOzFiZOg&riu=http%3a%2f%2fimages.shejidaren.com%2fwp-content%2fuploads%2f2014%2f07%2f085628m6c.jpg&ehk=v1vDvzVgPRc3irw6n%2bs5gF%2b5SEc1uCstErDhRaxqlgE%3d&risl=&pid=ImgRaw&r=0"
            style="width: 120px; height: 100px"
            alt=""
          />
          <div>
            <p>左边是一束樱花</p>
            <p>真的很漂亮欸~~~~~</p>
          </div>
        </div>
        <p>这是加载完成后的内容。</p>
      </div>
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; gap: 10px; align-items: center">
          <img
            src="https://pic1.zhimg.com/v2-a58fa2ab84be291418da2652805f8270_b.jpg"
            style="width: 120px; height: 100px"
            alt=""
          />
          <div>
            <p>左边是两只狐狸</p>
            <p>真的很可爱欸~~~~~</p>
          </div>
        </div>
        <p>这是加载完成后的内容。</p>
      </div>
    </template>
  </lb-skeleton>
  <lb-button @click="toggleLoading">切换加载状态</lb-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>

<style scoped lang="scss">
p {
  margin: 3px;
}
</style>
