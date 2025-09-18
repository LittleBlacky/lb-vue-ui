<template>
  <div class="demo-container">
    <h3>样式定制</h3>
    <p>通过不同的属性组合来定制图片的外观样式。</p>

    <div class="style-grid">
      <div class="style-item">
        <h4>默认样式</h4>
        <lb-image
          src="https://picsum.photos/200/150?random=style1"
          alt="默认样式"
          width="150"
          height="100"
        />
      </div>

      <div class="style-item">
        <h4>带边框</h4>
        <lb-image
          src="https://picsum.photos/200/150?random=style2"
          alt="带边框"
          bordered
          width="150"
          height="100"
        />
      </div>

      <div class="style-item">
        <h4>圆角样式</h4>
        <lb-image
          src="https://picsum.photos/200/150?random=style3"
          alt="圆角样式"
          radius="12px"
          width="150"
          height="100"
        />
      </div>

      <div class="style-item">
        <h4>圆形图片</h4>
        <lb-image
          src="https://picsum.photos/200/150?random=style4"
          alt="圆形图片"
          radius="50%"
          width="100"
          height="100"
        />
      </div>

      <div class="style-item">
        <h4>始终阴影</h4>
        <lb-image
          src="https://picsum.photos/200/150?random=style5"
          alt="始终阴影"
          shadow="always"
          width="150"
          height="100"
        />
      </div>

      <div class="style-item">
        <h4>悬停阴影</h4>
        <lb-image
          src="https://picsum.photos/200/150?random=style6"
          alt="悬停阴影"
          shadow="hover"
          width="150"
          height="100"
        />
      </div>

      <div class="style-item">
        <h4>组合样式</h4>
        <lb-image
          src="https://picsum.photos/200/150?random=style7"
          alt="组合样式"
          bordered
          radius="8px"
          shadow="hover"
          width="150"
          height="100"
        />
      </div>

      <div class="style-item">
        <h4>自定义尺寸</h4>
        <lb-image
          src="https://picsum.photos/200/150?random=style8"
          alt="自定义尺寸"
          :width="120"
          :height="80"
          radius="6px"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 20px;
}

.style-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.style-item {
  text-align: center;
}

.style-item h4 {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}
</style>
