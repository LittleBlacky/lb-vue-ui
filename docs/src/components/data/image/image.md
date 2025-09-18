# LbImage 图片组件

一个功能丰富的图片组件，支持加载状态、错误处理、预览功能、懒加载等特性。

## 基础用法

最简单的用法，只需要传入图片地址即可。

<preview path="./demos/BasicUsage.vue" />

## 图片适应方式

通过 `fit` 属性可以设置图片的适应方式，类似于 CSS 的 `object-fit` 属性。

<preview path="./demos/FitTypes.vue" />

## 错误处理

组件内置了错误处理机制，可以自定义错误时的显示内容。

<preview path="./demos/Error.vue" />

## 预览功能

设置 `previewList` 属性可以开启图片预览功能，支持多图预览、缩放、旋转、拖拽等操作。

<preview path="./demos/Preview.vue" />

## 懒加载

通过 `lazy` 属性开启懒加载功能，图片会在进入视口时才开始加载。

<preview path="./demos/LazyLoad.vue" />

## Image 
### Image Props

| 属性名       | 说明                   | 类型                                                    | 可选值                                     | 默认值 |
| ------------ | ---------------------- | ------------------------------------------------------- | ------------------------------------------ | ------ |
| src          | 图片源地址             | string                                                  | —                                          | —      |
| alt          | 图片描述文本           | string                                                  | —                                          | —      |
| fit          | 图片适应方式           | string                                                  | fill / contain / cover / none / scale-down | fill   |
| lazy         | 是否懒加载             | boolean                                                 | —                                          | false  |
| errorSrc     | 图片加载失败时的占位图 | string                                                  | —                                          | —      |
| loadingSrc   | 图片加载中的占位图     | string                                                  | —                                          | —      |
| previewList  | 预览图片列表           | string[]                                                | —                                          | []     |
| width        | 图片宽度               | string \| number                                        | —                                          | —      |
| height       | 图片高度               | string \| number                                        | —                                          | —      |
| radius       | 圆角大小               | string \| number                                        | —                                          | —      |
| initialIndex | 预览时的初始索引       | number                                                  | —                                          | 0      |
| zoomStep     | 缩放步长               | number                                                  | —                                          | 0.2    |
| maxZoom      | 最大缩放比例           | number                                                  | —                                          | 3      |
| minZoom      | 最小缩放比例           | number                                                  | —                                          | 0.2    |

### Image Events

| 事件名 | 说明             | 回调参数       |
| ------ | ---------------- | -------------- |
| load   | 图片加载完成事件 | (event: Event) |
| error  | 图片加载错误事件 | (event: Event) |
| switch | 预览图片切换事件 | (index: number) |

### Image Slots

| 插槽名  | 说明               |
| ------- | ------------------ |
| loading | 自定义加载中的内容 |
| error   | 自定义错误时的内容 |