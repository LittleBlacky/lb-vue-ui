# Splitter 分割面板

## 基础用法

<preview path="./demos/basic.vue"></preview>

## 折叠功能

<preview path="./demos/collapse.vue"></preview>

## 垂直分割

<preview path="./demos/vertical.vue"></preview>

## 最小/最大尺寸

<preview path="./demos/min-max-size.vue"></preview>

## 嵌套使用

<preview path="./demos/nested.vue"></preview>

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
