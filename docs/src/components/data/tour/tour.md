# Tour 引导教程组件

用于步骤式引导，帮助用户快速了解应用功能。

## 基础用法

<preview path="./demos/BasicUsage.vue" />

## 步骤配置

<preview path="./demos/StepConfiguration.vue" />

## Tour
### Tour Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ---- | ---- | ------ | ------ |
| modelValue / v-model | 是否显示引导 | boolean | — | false |
| current | 当前步骤索引 | number | — | 0 |
| mask | 是否显示遮罩层 | boolean | — | true |
| closable | 是否显示关闭按钮 | boolean | — | true |
| showArrow | 是否显示箭头 | boolean | — | true |
| showIndicators | 是否显示指示器 | boolean | — | true |
| placement | 默认弹出位置 | string | top / bottom / left / right / top-start / top-end / bottom-start / bottom-end / left-start / left-end / right-start / right-end | bottom |
| scrollIntoViewOptions | 滚动配置 | boolean \| ScrollIntoViewOptions | — | true |
| zIndex | 层级 | number | — | — |
| type | 引导类型 | string | default / primary | default |
| indicatorsRender | 自定义指示器渲染函数 | function | — | — |

### Tour Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| update:modelValue | 显示状态变化 | (value: boolean) => void |
| update:current | 当前步骤变化 | (current: number) => void |
| change | 步骤变化 | (current: number, prev: number) => void |
| close | 关闭引导 | () => void  |
| finish | 完成引导 | () => void |

### Tour Slots

| 插槽名 | 说明 | 参数 |
| ------ | ---- | ---- |
| default | Tour 组件插槽 | — |

### Tour Exposes

| 属性名 | 说明 | 类型 |
| ------ | ---- | -------- |
| current | 当前步骤索引 | Ref<number\> |
| steps | 所有步骤配置 | Ref<LbTourStepConfig[]\> |
| start | 开始引导方法 | () => void |
| close | 关闭引导方法 | () => void  |
| next | 下一步方法 | () => void  |
| prev | 上一步方法 | () => void  |
| goTo | 跳转到指定步骤 | (step: number) => void |

## TourStep

### TourStep Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ---- | ---- | ------ | ------ |
| target | 目标元素选择器或DOM元素 | string \| HTMLElement | — | — |
| title | 步骤标题 | string | — | — |
| description | 步骤描述 | string | — | — |
| cover | 步骤封面图片 | string | — | — |
| placement | 弹出位置 | string | top / bottom / left / right / top-start / top-end / bottom-start / bottom-end / left-start / left-end / right-start / right-end | — |
| mask | 是否显示遮罩 | boolean | — | — |
| type | 步骤类型 | string | default / primary | default |