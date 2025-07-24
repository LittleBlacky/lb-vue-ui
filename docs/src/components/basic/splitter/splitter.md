# Splitter 分割面板

## 基础用法

<demo vue="./demos/basic.vue"></demo>

## 折叠功能

<demo vue="./demos/collapse.vue"></demo>

## 垂直分割

<demo vue="./demos/vertical.vue"></demo>

## 最小/最大尺寸

<demo vue="./demos/min-max-size.vue"></demo>

## 嵌套使用

<demo vue="./demos/nested.vue"></demo>

## Splitter

### Attributes

| Attribute | Description | Type                      | Accepted Values           | Default      |
| --------- | ----------- | ------------------------- | ------------------------- | ------------ |
| direction | 分割方向    | `horizontal` / `vertical` | `horizontal` / `vertical` | `horizontal` |
| dragging  | 是否可拖拽  | `boolean`                 | `true` / `false`          | `true`       |

### Events

| Event Name | Description      | Parameters          |
| ---------- | ---------------- | ------------------- |
| resize     | 拖拽分割条时触发 | `(sizes: number[])` |

## SplitterPanel

### Attributes

| Attribute  | Description    | Type      | Accepted Values  | Default     |
| ---------- | -------------- | --------- | ---------------- | ----------- |
| size       | 面板大小       | `number`  | —                | `undefined` |
| minSize    | 最小尺寸       | `number`  | —                | `0`         |
| maxSize    | 最大尺寸       | `number`  | —                | `Infinity`  |
| resizeabel | 是否可调整大小 | `boolean` | `true` / `false` | `true`      |
