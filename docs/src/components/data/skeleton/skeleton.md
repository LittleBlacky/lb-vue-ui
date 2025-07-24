# Skeleton 骨架屏

骨架屏组件，用于在内容加载时提供占位符。

## 何时使用

当页面或区块内容正在加载时，显示一个占位符，提升用户体验。

## 代码示例

### 基础用法

通过 `loading` 属性控制骨架屏的显示与隐藏。

<demo vue="./demos/BasicUsage.vue"></demo>

### 动画效果

通过 `animated` 属性开启骨架屏的动画效果。

<demo vue="./demos/AnimatedSkeleton.vue"></demo>

### 自定义行数和数量

通过 `rows` 和 `count` 属性控制骨架屏的行数和数量。

<demo vue="./demos/CustomRowsAndCount.vue"></demo>

## LbSkeleton Props

| 属性名    | 说明                               | 类型      | 可选值                               | 默认值 |
| --------- | ---------------------------------- | --------- | ------------------------------------ | ------ |
| animated  | 是否开启动画                       | `boolean` | `true \| false`                      | `false`|
| rows      | 骨架屏段落的行数                   | `number`  | -                                    | `0`    |
| count     | 骨架屏的数量                       | `number`  | -                                    | `1`    |
| loading   | 是否显示骨架屏                     | `boolean` | `true \| false`                      | `true` |
| throttle  | 延迟显示骨架屏的时间 (ms)          | `number`  | -                                    | `0`    |
| duration  | 动画持续时间 (s)                   | `number`  | -                                    | `1.5`  |
| variant   | 骨架屏的变体类型 (仅在无插槽时生效) | `string`  | `text \| circle \| rect \| image \| button` | `text` |

## LbSkeleton Slots

| 插槽名   | 说明         |
| -------- | ------------ |
| default  | 加载完成后的内容 |
| template | 骨架屏模板内容 |

## LbSkeletonItem Props

| 属性名  | 说明         | 类型     | 可选值                               | 默认值 |
| ------- | ------------ | -------- | ------------------------------------ | ------ |
| variant | 骨架屏元素的变体类型 | `string` | `text \| circle \| rect \| image \| button` | `text` |