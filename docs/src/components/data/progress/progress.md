# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。基于 SVG 实现，提供高质量的渲染效果和丰富的自定义选项。


## 基础用法

最简单的进度条用法，使用 SVG 实现高质量渲染。

<preview path="./demos/BasicUsage.vue" />

## 进度条类型

支持线性和圆形两种类型，均基于 SVG 实现。

<preview path="./demos/Types.vue" />

## 进度条状态

通过 `status` 属性设置进度条状态，支持成功、异常、警告等状态。

<preview path="./demos/Status.vue" />

## 自定义颜色

通过 `color` 属性自定义进度条颜色，支持渐变色。

<preview path="./demos/CustomColors.vue" />

## 文字位置

通过 `text-position` 属性控制文字显示位置。

<preview path="./demos/TextPosition.vue" />

## 动画效果

通过 `animated` 属性启用动画效果，让进度条变化更加平滑。

<preview path="./demos/Animation.vue" />

## Progress

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| percentage | 百分比（必填） | number | 0-100 | 0 |
| type | 进度条类型 | string | line / circle | line |
| status | 进度条状态 | string | success / exception / warning | — |
| size | 进度条尺寸 | string | small / default / large | default |
| width | 进度条宽度 | number / string | — | — |
| height | 进度条高度（仅线性进度条） | number / string | — | 6 |
| color | 进度条颜色 | string | — | #409eff |
| show-text | 是否显示进度文字 | boolean | — | true |
| text-position | 文字位置 | string | right / inside / center | right |
| animated | 是否启用动画 | boolean | — | false |
| duration | 动画持续时间（毫秒） | number | — | 300 |
| stroke-width | 进度条线宽 | number | — | 6 |
| stroke-linecap | 进度条端点形状 | string | butt / round / square | round |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 进度变化时触发 | (percentage: number) |

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|----------|
| default | 自定义文字内容 | { percentage } |

### Exposes

| 属性名 | 说明 | 参数 |
|--------|------|------|
| setPercentage | 设置进度百分比 | (percentage: number) |