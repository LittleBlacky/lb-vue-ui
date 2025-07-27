# Row & Col 栅格布局

基于24栅格系统的布局组件。

## 基础用法

<preview path="./demos/grid-basic.vue"></preview>

## 响应式布局

<preview path="./demos/grid-responsive.vue"></preview>

## 栅格间隔

<preview path="./demos/grid-gutter.vue"></preview>

## 对齐方式

<preview path="./demos/grid-align.vue"></preview>

## Row Attributes

| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
| gutter | 栅格间隔 | `number` | `—` | `0` |
| justify | flex 布局下的水平排列方式 | `string` | `start` / `end` / `center` / `space-around` / `space-between` / `space-evenly` | `start` |
| align | flex 布局下的垂直排列方式 | `string` | `top` / `middle` / `bottom` | `top` |

## Col Attributes

| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
| span | 栅格占据的列数 | `number` | `—` | `24` |
| offset | 栅格左侧的间隔格数 | `number` | `—` | `0` |
| pull | 栅格向左移动的格数 | `number` | `—` | `0` |
| push | 栅格向右移动的格数 | `number` | `—` | `0` |
| xs | `<768px` 响应式栅格数或者栅格属性对象 | `number` / `object` | `—` | `—` |
| sm | `≥768px` 响应式栅格数或者栅格属性对象 | `number` / `object` | `—` | `—` |
| md | `≥992px` 响应式栅格数或者栅格属性对象 | `number` / `object` | `—` | `—` |
| lg | `≥1200px` 响应式栅格数或者栅格属性对象 | `number` / `object` | `—` | `—` |
| xl | `≥1920px` 响应式栅格数或者栅格属性对象 | `number` / `object` | `—` | `—` |