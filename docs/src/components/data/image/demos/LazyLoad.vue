<template>
  <div class="demo-container">
    <h3>懒加载</h3>
    <p>
      启用懒加载后，图片只有在进入可视区域时才会开始加载，有助于提升页面性能。
    </p>

    <div class="lazy-demo">
      <div class="scroll-area">
        <div class="placeholder">
          <p>滚动下方查看懒加载效果</p>
        </div>

        <div class="lazy-images">
          <div class="lazy-item">
            <h4>懒加载图片 1</h4>
            <lb-image
              src="https://picsum.photos/400/300?random=1"
              alt="懒加载图片1"
              lazy
              width="300px"
              height="200px"
              @load="handleLoad"
            />
          </div>

          <div class="lazy-item">
            <h4>懒加载图片 2</h4>
            <lb-image
              src="https://picsum.photos/400/300?random=2"
              alt="懒加载图片2"
              lazy
              width="300px"
              height="200px"
              @load="handleLoad"
            />
          </div>

          <div class="lazy-item">
            <h4>懒加载图片 3</h4>
            <lb-image
              src="https://picsum.photos/400/300?random=3"
              alt="懒加载图片3"
              lazy
              width="300px"
              height="200px"
              @load="handleLoad"
            />
          </div>

          <div class="lazy-item">
            <h4>懒加载图片 4</h4>
            <lb-image
              src="https://picsum.photos/400/300?random=4"
              alt="懒加载图片4"
              lazy
              width="300px"
              height="200px"
              @load="handleLoad"
            />
          </div>
        </div>
      </div>

      <div class="load-info">
        <h4>加载状态</h4>
        <p>已加载图片数量: {{ loadedCount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const loadedCount = ref(0);

const handleLoad = (event) => {
  loadedCount.value++;
  console.log("图片加载完成:", event.target.src);
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.lazy-demo {
  display: flex;
  gap: 20px;
}

.scroll-area {
  flex: 1;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 20px;
}

.placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 6px;
  margin-bottom: 20px;
}

.placeholder p {
  color: #666;
  font-size: 16px;
}

.lazy-images {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.lazy-item {
  text-align: center;
}

.lazy-item h4 {
  margin-bottom: 10px;
  color: #333;
}

.load-info {
  width: 200px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 6px;
  height: fit-content;
}

.load-info h4 {
  margin-bottom: 10px;
  color: #333;
}

.load-info p {
  margin: 10px 0;
  color: #666;
}
</style>
