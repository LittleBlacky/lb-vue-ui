# Scrollbar 滚动条

用于替换浏览器原生滚动条，提供更好的视觉效果和用户体验。

## 基本用法

<preview path="./demos/basic.vue"></preview>

## 设置高度

通过 `height` 属性设置滚动区域的高度。

<preview path="./demos/height.vue"></preview>

## 最大高度

通过 `max-height` 属性设置滚动区域的最大高度。

<preview path="./demos/max-height.vue"></preview>

## 原生滚动条

通过 `native` 属性使用原生滚动条样式。

<preview path="./demos/native.vue"></preview>

## 总是显示

通过 `always` 属性让滚动条总是显示。

<preview path="./demos/always.vue"></preview>

## 手动控制

通过组件实例的方法手动控制滚动位置。

<preview path="./demos/manual.vue"></preview>

## 滚动到底部事件

当滚动到底部时会触发 `end-reached` 事件，常用于实现无限滚动等功能。

<preview path="./demos/end-reached.vue"></preview>

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| height | string \| number | — | 滚动条的高度 |
| max-height | string \| number | — | 滚动条的最大高度 |
| native | boolean | false | 是否使用原生滚动条样式 |
| wrap-style | StyleValue | — | 包裹容器的样式 |
| wrap-class | string \| string[] | — | 包裹容器的类名 |
| view-style | StyleValue | — | 视图的样式 |
| view-class | string \| string[] | — | 视图的类名 |
| noresize | boolean | false | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 |
| tag | string | 'div' | 视图的元素标签 |
| always | boolean | false | 总是显示滚动条 |
| min-size | number | 20 | 滚动条最小尺寸 |
| id | string | — | 视图的 id |
| role | string | — | 视图的 role |
| aria-label | string | — | 视图的 aria-label |
| aria-orientation | 'horizontal' \| 'vertical' | — | 视图的 aria-orientation |
| tabindex | number \| string | — | 包裹容器的 tabindex |

## 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| scroll | 滚动时触发 | `{ scrollTop: number, scrollLeft: number }` |
| end-reached | 滚动到底部时触发 | — |

## 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| handleScroll | 处理滚动事件 | — |
| scrollTo | 滚动到特定位置 | `(options: ScrollToOptions \| number, yCoord?: number)` |
| setScrollTop | 设置滚动条到顶部的距离 | `(scrollTop: number)` |
| setScrollLeft | 设置滚动条到左边的距离 | `(scrollLeft: number)` |
| update | 手动更新滚动条状态 | — |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 滚动内容 |