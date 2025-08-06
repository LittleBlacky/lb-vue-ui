# Tooltip

## 基础用法

<preview path="./demos/basic.vue"></preview>

## 不同位置

<preview path="./demos/placement.vue"></preview>

## 不同触发方式

<preview path="./demos/trigger.vue"></preview>

## Tooltip Props

| Attribute | Description | Type | Accepted Values | Default |
| --------- | ----------- | ---- | --------------- | ------- |
| content | 显示的内容 | `string` | — | `''` |
| showAfter | 延迟显示，单位毫秒 | `number` | — | `300` |
| hideAfter | 延迟隐藏，单位毫秒 | `number` | — | `300` |
| strategy | 定位策略 | `'absolute' \| 'fixed'` | `absolute` / `fixed` | `absolute` |
| appendTo | 附加到指定元素 | `HTMLElement` | — | `undefined` |
| trigger | 触发方式 | `'hover' \| 'click' \| 'focus'` | `hover` / `click` / `focus` | `hover` |
| transition | 动画名称 | `string` | — | `lb-fade` |
| placement | 出现位置 | `'top' \| 'top-start' \| 'top-end' \| 'right' \| 'right-start' \| 'right-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end'` | — | `top` |
| offset | 偏移量 | `number` | — | `9` |
| disabled | 是否禁用 | `boolean` | `true` / `false` | `false` |
| popperClass | Popper 的自定义类名 | `string` | — | `''` |
| virtualTriggering | 是否使用虚拟触发 | `boolean` | `true` / `false` | `false` |
| virtualRef | 虚拟触发的引用元素 | `HTMLElement` | — | `undefined` |

## Tooltip Events

| Event Name | Description | Parameters |
| ---------- | ----------- | ---------- |
| visible | 气泡显示/隐藏时触发 | `(visible: boolean)` |