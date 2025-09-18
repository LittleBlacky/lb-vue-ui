<template>
  <div class="demo-container">
    <h3>预览功能</h3>
    <p>
      设置 previewList
      属性可以开启图片预览功能，支持多图预览、缩放、旋转、拖拽等操作。
    </p>

    <div class="preview-grid">
      <div class="preview-item">
        <h4>单图预览</h4>
        <lb-image
          src="https://picsum.photos/300/200?random=preview1"
          alt="预览图片1"
          :preview-list="['https://picsum.photos/800/600?random=preview1']"
          width="200"
          height="150"
          @switch="handleSwitch"
        />
      </div>

      <div class="preview-item">
        <h4>多图预览</h4>
        <lb-image
          src="https://picsum.photos/300/200?random=preview2"
          alt="预览图片2"
          :preview-list="previewImages"
          :initial-index="0"
          width="200"
          height="150"
          radius="8px"
          @switch="handleSwitch"
        />
      </div>

      <div class="preview-item">
        <h4>自定义初始索引</h4>
        <lb-image
          src="https://picsum.photos/300/200?random=preview4"
          alt="预览图片4"
          :preview-list="previewImages"
          :initial-index="2"
          width="200"
          height="150"
          @switch="handleSwitch"
        />
      </div>
    </div>

    <div class="preview-gallery">
      <h4>图片画廊</h4>
      <div class="gallery-grid">
        <lb-image
          v-for="(img, index) in previewImages"
          :key="index"
          :src="img"
          :preview-list="previewImages"
          :initial-index="index"
          width="120"
          height="90"
          fit="cover"
          radius="6px"
          @switch="handleSwitch"
        />
      </div>
    </div>

    <div v-if="currentIndex !== null" class="preview-info">
      <h4>预览信息</h4>
      <p>当前预览索引: {{ currentIndex }}</p>
      <p>当前图片: {{ previewImages[currentIndex] }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentIndex = ref(null);

const previewImages = [
  "https://picsum.photos/800/600?random=gallery1",
  "https://picsum.photos/800/600?random=gallery2",
  "https://picsum.photos/800/600?random=gallery3",
  "https://picsum.photos/800/600?random=gallery4",
  "https://picsum.photos/800/600?random=gallery5",
  "https://picsum.photos/800/600?random=gallery6",
];

const handleSwitch = (index) => {
  currentIndex.value = index;
  console.log("切换到图片索引:", index);
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.preview-item {
  text-align: center;
}

.preview-item h4 {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.preview-gallery {
  margin-top: 30px;
}

.preview-gallery h4 {
  margin-bottom: 15px;
  color: #333;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.preview-info {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 6px;
}

.preview-info h4 {
  margin-bottom: 10px;
  color: #333;
}

.preview-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}
</style>
