<template>
  <div class="demo-container">
    <h3>尺寸设置</h3>
    <p>通过 <code>width</code> 和 <code>height</code> 属性控制图片的尺寸。</p>

    <div class="size-section">
      <h4>固定尺寸</h4>
      <div class="size-grid">
        <div class="size-item">
          <h5>小尺寸 (100x75)</h5>
          <lb-image
            src="https://picsum.photos/200/150?random=size1"
            alt="小尺寸"
            :width="100"
            :height="75"
          />
        </div>

        <div class="size-item">
          <h5>中等尺寸 (200x150)</h5>
          <lb-image
            src="https://picsum.photos/200/150?random=size2"
            alt="中等尺寸"
            :width="200"
            :height="150"
          />
        </div>

        <div class="size-item">
          <h5>大尺寸 (300x200)</h5>
          <lb-image
            src="https://picsum.photos/200/150?random=size3"
            alt="大尺寸"
            :width="300"
            :height="200"
          />
        </div>
      </div>
    </div>

    <div class="size-section">
      <h4>字符串尺寸</h4>
      <div class="size-grid">
        <div class="size-item">
          <h5>百分比宽度</h5>
          <lb-image
            src="https://picsum.photos/200/150?random=size4"
            alt="百分比宽度"
            width="50%"
            height="150px"
          />
        </div>

        <div class="size-item">
          <h5>视口单位</h5>
          <lb-image
            src="https://picsum.photos/200/150?random=size5"
            alt="视口单位"
            width="20vw"
            height="15vw"
          />
        </div>

        <div class="size-item">
          <h5>最大宽度</h5>
          <lb-image
            src="https://picsum.photos/200/150?random=size6"
            alt="最大宽度"
            width="100%"
            height="auto"
            style="max-width: 250px"
          />
        </div>
      </div>
    </div>

    <div class="size-section">
      <h4>响应式尺寸</h4>
      <div class="responsive-demo">
        <lb-image
          src="https://picsum.photos/400/300?random=responsive"
          alt="响应式图片"
          width="100%"
          height="200px"
          fit="cover"
          radius="8px"
        />
        <p style="text-align: center; margin-top: 10px; color: #666">
          这张图片会根据容器宽度自动调整
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 20px;
}

.size-section {
  margin: 30px 0;
}

.size-section h4 {
  margin-bottom: 15px;
  color: #333;
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 15px 0;
}

.size-item {
  text-align: center;
}

.size-item h5 {
  margin-bottom: 10px;
  font-size: 12px;
  color: #666;
}

.responsive-demo {
  max-width: 500px;
  margin: 0 auto;
}

code {
  background: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: "Courier New", monospace;
}
</style>
