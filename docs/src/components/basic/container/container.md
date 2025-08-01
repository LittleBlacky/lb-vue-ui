# Container 布局

用于布局的容器组件。

## 基础用法

### 常见页面布局
<preview path="./demos/common1.vue"></preview>
<preview path="./demos/common2.vue"></preview>
<preview path="./demos/common3.vue"></preview>
<preview path="./demos/common4.vue"></preview>
<preview path="./demos/common5.vue"></preview>
<preview path="./demos/common6.vue"></preview>
## Container 属性

| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
| direction | 子元素的排列方向 | `string` | `horizontal` / `vertical` | 当子元素中包含 `LbHeader` 或 `LbFooter` 时为 `vertical`，否则为 `horizontal` |

## Header 属性

| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
| height | 顶栏高度 | `string` | `—` | `60px` |

## Aside 属性

| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
| width | 侧边栏宽度 | `string` | `—` | `300px` |

## Footer 属性

| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
| height | 底栏高度 | `string` | `—` | `60px` |