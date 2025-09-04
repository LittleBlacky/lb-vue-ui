用于在多个备选项中选中单个结果。

## 基础用法

<preview path="./demos/BasicUsage.vue" />

## 禁用状态

<preview path="./demos/DisabledState.vue" />

## 尺寸

<preview path="./demos/Sizes.vue" />

## 筛选功能

::: tip
可以通过 filterable-method 自定义筛选逻辑。
:::
<preview path="./demos/Filterable.vue" />

## Select Props

| 属性名                   | 说明           | 类型                                               | 可选值                   | 默认值  |
| ------------------------ | -------------- | -------------------------------------------------- | ------------------------ | ------- |
| `modelValue` / `v-model` | 绑定值         | `string \| number \| boolean \| null`              | —                        | `null`  |
| `placeholder`            | 占位符         | `string`                                           | —                        | `''`    |
| `disabled`               | 是否禁用       | `boolean`                                          | `true \| false`          | `false` |
| `size`                   | Select 的尺寸  | `"small" \| "base" \| "large"`                     | `small`, `base`, `large` | `base`  |
| `clearable`              | 是否可清空     | `boolean`                                          | `true \| false`          | `false` |
| `filterable`             | 是否可搜索     | `boolean`                                          | `true \| false`          | `false` |
| `filterable-method`      | 自定义筛选逻辑 | `(value: string, option: SelectOption) => boolean` | —                        | —       |
| `multiple`               | 是否多选       | `boolean`                                          | `true \| false`          | `false` |

## Select Events

| 事件名              | 说明                   | 回调参数                                               |
| ------------------- | ---------------------- | ------------------------------------------------------ |
| `change`            | 绑定值变化时触发的事件 | `(value: string \| number \| boolean \| null) => void` |
| `update:modelValue` | 绑定值变化时触发的事件 | `(value: string \| number \| boolean \| null) => void` |
| `clear`             | 清空时触发的事件       | `() => void`                                           |

## SelectOption Props

| 属性名     | 说明       | 类型                          | 可选值          | 默认值  |
| ---------- | ---------- | ----------------------------- | --------------- | ------- |
| `value`    | 选项的值   | `string \| number \| boolean` | —               | —       |
| `label`    | 选项的标签 | `string`                      | —               | —       |
| `disabled` | 是否禁用   | `boolean`                     | `true \| false` | `false` |

## SelectOption Events

| 事件名   | 说明             | 回调参数                                       |
| -------- | ---------------- | ---------------------------------------------- |
| `select` | 选中时触发的事件 | `(value: string \| number \| boolean) => void` |
