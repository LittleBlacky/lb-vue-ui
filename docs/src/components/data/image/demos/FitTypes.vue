<template>
  <div class="demo-container">
    <div class="fit-grid">
      <div class="fit-item">
        <h4>fill - 拉伸填充</h4>
        <lb-image
          src="https://picsum.photos/400/300?random=2"
          alt="fill示例"
          fit="fill"
          width="200"
          height="150"
        />
      </div>

      <div class="fit-item">
        <h4>contain - 保持比例包含</h4>
        <lb-image
          src="https://picsum.photos/400/300?random=3"
          alt="contain示例"
          fit="contain"
          width="200"
          height="150"
        />
      </div>

      <div class="fit-item">
        <h4>cover - 保持比例覆盖</h4>
        <lb-image
          src="https://picsum.photos/400/300?random=4"
          alt="cover示例"
          fit="cover"
          width="200"
          height="150"
        />
      </div>

      <div class="fit-item">
        <h4>none - 原始尺寸</h4>
        <lb-image
          src="https://picsum.photos/400/300?random=5"
          alt="none示例"
          fit="none"
          width="200"
          height="150"
        />
      </div>

      <div class="fit-item">
        <h4>scale-down - 缩小适应</h4>
        <lb-image
          src="https://picsum.photos/400/300?random=6"
          alt="scale-down示例"
          fit="scale-down"
          width="200"
          height="150"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 20px;
}

.fit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 50px;
  margin: 20px 0;
}

.fit-item {
  text-align: center;
}

.fit-item h4 {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

code {
  background: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: "Courier New", monospace;
}
</style>
