<template>
  <div class="demo-container">
    <h3>实际应用场景</h3>
    <p>展示LbImage组件在实际项目中的应用场景。</p>

    <!-- 用户头像 -->
    <div class="usage-section">
      <h4>用户头像</h4>
      <div class="avatar-demo">
        <div class="avatar-item">
          <lb-image
            src="https://picsum.photos/80/80?random=avatar1"
            alt="用户头像"
            width="60"
            height="60"
            radius="50%"
            fallback="https://via.placeholder.com/60x60/cccccc/666666?text=头像"
          />
          <span>张三</span>
        </div>
        <div class="avatar-item">
          <lb-image
            src="https://invalid-url.com/avatar.jpg"
            alt="用户头像"
            width="60"
            height="60"
            radius="50%"
            fallback="https://via.placeholder.com/60x60/cccccc/666666?text=头像"
          />
          <span>李四</span>
        </div>
        <div class="avatar-item">
          <lb-image
            src="https://picsum.photos/80/80?random=avatar3"
            alt="用户头像"
            width="60"
            height="60"
            radius="50%"
            fallback="https://via.placeholder.com/60x60/cccccc/666666?text=头像"
          />
          <span>王五</span>
        </div>
      </div>
    </div>

    <!-- 产品卡片 -->
    <div class="usage-section">
      <h4>产品卡片</h4>
      <div class="product-grid">
        <div class="product-card" v-for="product in products" :key="product.id">
          <lb-image
            :src="product.image"
            :alt="product.name"
            width="100%"
            height="200"
            fit="cover"
            radius="8px 8px 0 0"
            preview
            @preview="handleProductPreview"
          />
          <div class="product-info">
            <h5>{{ product.name }}</h5>
            <p class="price">¥{{ product.price }}</p>
            <lb-button size="small" type="primary">立即购买</lb-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片画廊 -->
    <div class="usage-section">
      <h4>图片画廊</h4>
      <div class="gallery">
        <div
          class="gallery-item"
          v-for="(image, index) in galleryImages"
          :key="index"
        >
          <lb-image
            :src="image.src"
            :alt="image.alt"
            width="100%"
            height="150"
            fit="cover"
            radius="6px"
            preview
            lazy
            @preview="handleGalleryPreview"
          />
          <div class="gallery-overlay">
            <span>{{ image.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 新闻列表 -->
    <div class="usage-section">
      <h4>新闻列表</h4>
      <div class="news-list">
        <div class="news-item" v-for="news in newsList" :key="news.id">
          <lb-image
            :src="news.thumbnail"
            :alt="news.title"
            width="120"
            height="80"
            fit="cover"
            radius="4px"
            lazy
          />
          <div class="news-content">
            <h5>{{ news.title }}</h5>
            <p>{{ news.summary }}</p>
            <span class="news-time">{{ news.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const products = ref([
  {
    id: 1,
    name: "智能手机",
    price: 2999,
    image: "https://picsum.photos/300/200?random=product1",
  },
  {
    id: 2,
    name: "笔记本电脑",
    price: 5999,
    image: "https://picsum.photos/300/200?random=product2",
  },
  {
    id: 3,
    name: "无线耳机",
    price: 299,
    image: "https://picsum.photos/300/200?random=product3",
  },
]);

const galleryImages = ref([
  {
    src: "https://picsum.photos/400/300?random=gallery1",
    alt: "风景1",
    title: "美丽风景",
  },
  {
    src: "https://picsum.photos/400/300?random=gallery2",
    alt: "风景2",
    title: "城市夜景",
  },
  {
    src: "https://picsum.photos/400/300?random=gallery3",
    alt: "风景3",
    title: "海边日落",
  },
  {
    src: "https://picsum.photos/400/300?random=gallery4",
    alt: "风景4",
    title: "山间晨雾",
  },
  {
    src: "https://picsum.photos/400/300?random=gallery5",
    alt: "风景5",
    title: "森林小径",
  },
  {
    src: "https://picsum.photos/400/300?random=gallery6",
    alt: "风景6",
    title: "雪山湖泊",
  },
]);

const newsList = ref([
  {
    id: 1,
    title: "科技新闻：人工智能技术取得重大突破",
    summary:
      "最新的人工智能技术在多个领域取得了突破性进展，为未来发展奠定了坚实基础。",
    thumbnail: "https://picsum.photos/200/150?random=news1",
    time: "2小时前",
  },
  {
    id: 2,
    title: "经济动态：全球市场呈现积极态势",
    summary:
      "随着各项政策的实施，全球经济市场展现出良好的发展势头，投资者信心增强。",
    thumbnail: "https://picsum.photos/200/150?random=news2",
    time: "4小时前",
  },
  {
    id: 3,
    title: "体育赛事：精彩比赛即将开始",
    summary:
      "备受瞩目的体育赛事即将拉开帷幕，各支队伍都在积极备战，期待精彩表现。",
    thumbnail: "https://picsum.photos/200/150?random=news3",
    time: "6小时前",
  },
]);

const handleProductPreview = (src) => {
  console.log("预览产品图片:", src);
  // 实际项目中可以打开产品详情页或图片预览弹窗
};

const handleGalleryPreview = (src) => {
  console.log("预览画廊图片:", src);
  // 实际项目中可以打开图片预览弹窗
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.usage-section {
  margin: 40px 0;
}

.usage-section h4 {
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

/* 用户头像 */
.avatar-demo {
  display: flex;
  gap: 20px;
  align-items: center;
}

.avatar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-item span {
  font-size: 14px;
  color: #666;
}

/* 产品卡片 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-info {
  padding: 15px;
}

.product-info h5 {
  margin: 0 0 10px 0;
  color: #333;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
  margin: 10px 0;
}

/* 图片画廊 */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.gallery-item {
  position: relative;
  cursor: pointer;
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 10px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

/* 新闻列表 */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  transition: box-shadow 0.3s ease;
}

.news-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.news-content {
  flex: 1;
}

.news-content h5 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 16px;
}

.news-content p {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.news-time {
  font-size: 12px;
  color: #999;
}
</style>
