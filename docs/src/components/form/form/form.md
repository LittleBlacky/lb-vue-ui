## Form 表单

用于数据录入、校验与提交，基于 async-validator 实现规则校验。

## 基础用法

<preview path="./demos/BasicUsage.vue" />

## 内联表单

<preview path="./demos/Inline.vue" />

## 自定义规则

<preview path="./demos/CustomValidator.vue" />

## 校验与重置

<preview path="./demos/Validation.vue" />

## 标签对齐与宽度

<preview path="./demos/LabelAlign.vue" />

## 帮助信息与行内错误

<preview path="./demos/HelpAndInlineMessage.vue" />

## Form Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
| model | 表单数据对象 | Record<string, any> | - | {} |
| rules | 校验规则，async-validator 兼容 | Record<string, Rule | Rule[]> | - | - |
| inline | 是否内联显示 | boolean | - | false |
| disabled | 是否禁用表单 | boolean | - | false |
| size | 组件尺寸 | 'small'|'base'|'large' | - | - |
| labelPosition | 标签位置 | 'left'|'right'|'top' | - | right |
| labelWidth | 标签宽度 | string | number | - | - |
| labelAlign | 标签对齐 | 'left'|'right' | - | - |
| labelSuffix | 标签后缀 | string | - | '' |
| showMessage | 是否显示校验信息 | boolean | - | true |
| inlineMessage | 以行内形式展示错误 | boolean | - | false |
| statusIcon | 是否显示状态图标 | boolean | - | false |
| validateOnRuleChange | 规则变化时自动校验 | boolean | - | true |
| hideRequiredAsterisk | 隐藏必填星号 | boolean | - | false |
| requireAsteriskPosition | 星号位置 | 'left'|'right' | - | left |

## Form Methods

| 方法 | 说明 | 签名 |
|---|---|---|
| validate | 校验所有字段 | `() => Promise<boolean>` |
| validateField | 校验指定字段 | `(prop: string, trigger?: 'change'|'blur') => Promise<boolean>` |
| resetFields | 重置所有字段的校验结果 | `() => void` |

## FormItem Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
| prop | 对应 `model` 字段名 | string | - | - |
| label | 标签文本 | string | - | - |
| labelWidth | 覆盖表单的标签宽度 | string | number | - | - |
| labelAlign | 覆盖表单的标签对齐 | 'left'|'right' | - | - |
| required | 额外标记必填（优先于规则自动推断） | boolean | - | false |
| showMessage | 覆盖表单的错误显示 | boolean | - | - |
| inlineMessage | 覆盖表单的行内错误显示 | boolean | - | - |
| help | 帮助信息 | string | - | - |
