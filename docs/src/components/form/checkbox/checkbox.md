# Checkbox 多选框

用于在一组选项中选择一个或多个结果。

## 基础用法

<preview path="./demos/BasicUsage.vue" />

## 分组用法

<preview path="./demos/GroupBasic.vue" />

## 半选状态

<preview path="./demos/Indeterminate.vue" />

## 禁用状态

<preview path="./demos/DisabledState.vue" />

## 尺寸

<preview path="./demos/Sizes.vue" />

## Checkbox Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
| `modelValue` / `v-model` | 绑定值 | `boolean \| null` | — | `null` |
| `label` | 显示文本（也作为回退的值） | `string \| number \| boolean` | — | `''` |
| `value` | 选项值（优先用于分组时判定） | `string \| number \| boolean` | — | `''` |
| `disabled` | 是否禁用 | `boolean` | `true \| false` | `false` |
| `indeterminate` | 是否为半选状态 | `boolean` | `true \| false` | `false` |
| `name` | 原生 `name` 属性 | `string` | — | `''` |
| `size` | 尺寸 | `"small" \| "base" \| "large"` | `small`, `base`, `large` | `base` |

## Checkbox Events

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| `change` | 勾选变化时触发 | `(checked: boolean) => void` |
| `update:modelValue` | 勾选变化时触发 | `(checked: boolean \| null) => void` |

## CheckboxGroup Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
| `modelValue` / `v-model` | 绑定数组值 | `Array<string \| number \| boolean>` | — | `[]` |
| `name` | 原生 `name` 属性 | `string` | — | `''` |
| `size` | 组内复选框尺寸 | `"small" \| "base" \| "large"` | `small`, `base`, `large` | `base` |
| `disabled` | 是否禁用 | `boolean` | `true \| false` | `false` |

## CheckboxGroup Events

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| `change` | 绑定值变化时触发 | `(value: Array<string \| number \| boolean>) => void` |
| `update:modelValue` | 绑定值变化时触发 | `(value: Array<string \| number \| boolean>) => void` |


