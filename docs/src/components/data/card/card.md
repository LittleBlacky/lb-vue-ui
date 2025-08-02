# Card 卡片

用于展示信息内容的容器组件。

## 基础用法

<preview path="./demos/basic.vue"></preview>

## 带副标题

<preview path="./demos/withSubtitle.vue"></preview>

## 自定义头部

<preview path="./demos/customHeader.vue"></preview>

## 带底部

<preview path="./demos/withFooter.vue"></preview>

## 阴影效果

<preview path="./demos/shadowEffects.vue"></preview>

## 可点击卡片

<preview path="./demos/clickable.vue"></preview>

## 禁用状态

<preview path="./demos/disabled.vue"></preview>

## 加载状态

<preview path="./demos/loading.vue"></preview>

## 自定义样式

<preview path="./demos/customStyle.vue"></preview>

## 无边框

<preview path="./demos/noBorder.vue"></preview>

## 隐藏头部

<preview path="./demos/noHeader.vue"></preview>

## 实际应用场景

<preview path="./demos/advanced.vue"></preview>

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| header | string | — | 卡片标题，会显示在头部区域 |
| subtitle | string | — | 卡片副标题，显示在标题下方 |
| showHeader | boolean | true | 是否显示头部区域，包括header插槽 |
| bordered | boolean | true | 是否显示边框 |
| shadow | 'always' \| 'hover' \| 'never' | 'always' | 阴影效果：always(始终显示)、hover(悬停显示)、never(不显示) |
| width | string \| number | — | 卡片宽度，数字单位为px |
| height | string \| number | — | 卡片高度，数字单位为px |
| headerClass | string | — | 头部区域的自定义CSS类名 |
| bodyClass | string | — | 内容区域的自定义CSS类名 |
| disabled | boolean | false | 是否禁用，禁用时无法交互且显示半透明效果 |
| clickable | boolean | false | 是否可点击，开启后鼠标悬停会有视觉反馈 |
| loading | boolean | false | 是否显示加载状态，会显示加载动画遮罩 |
| radius | string \| number | '8px' | 卡片圆角，数字单位为px |
| backgroundColor | string | — | 卡片背景色，支持任何有效的CSS颜色值 |
| headerBackgroundColor | string | — | 头部背景色，支持任何有效的CSS颜色值 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击卡片时触发，需要设置 `clickable` 为 `true` | (event: MouseEvent) |
| header-click | 点击头部时触发，即使卡片不可点击也会触发 | (event: MouseEvent) |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 卡片内容，可以包含任何HTML元素或组件 |
| header | 自定义头部内容，会覆盖默认的header和subtitle |
| footer | 自定义底部内容，通常用于放置操作按钮 |