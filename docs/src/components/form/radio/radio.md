# Radio 单选框

用于在多个备选项中选中单个结果。

## 基础用法

<preview path="./demos/BasicUsage.vue" />

## 禁用状态

<preview path="./demos/DisabledState.vue" />

## 尺寸

<preview path="./demos/Sizes.vue" />

## Radio Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
| `modelValue` / `v-model` | 绑定值 | `string \| number \| boolean \| null` | — | `null` |
| `label` | Radio 的 `value` | `string \| number \| boolean` | — | — |
| `disabled` | 是否禁用 | `boolean` | `true \| false` | `false` |
| `size` | Radio 的尺寸 | `"small" \| "base" \| "large"` | `small`, `base`, `large` | `base` |

## Radio Events

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| `change` | 绑定值变化时触发的事件 | `(value: string \| number \| boolean \| null) => void` |
| `update:modelValue` | 绑定值变化时触发的事件 | `(value: string \| number \| boolean \| null) => void` |

## RadioGroup Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
| `modelValue` / `v-model` | 绑定值 | `string \| number \| boolean \| null` | — | `null` |
| `name` | 原生 `name` 属性 | `string` | — | `''` |
| `size` | RadioGroup 的尺寸 | `"small" \| "base" \| "large"` | `small`, `base`, `large` | `base` |
| `disabled` | 是否禁用 | `boolean` | `true \| false` | `false` |

## RadioGroup Events

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| `change` | 绑定值变化时触发的事件 | `(value: string \| number \| boolean \| null) => void` |
| `update:modelValue` | 绑定值变化时触发的事件 | `(value: string \| number \| boolean \| null) => void` |