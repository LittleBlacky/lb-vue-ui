# Input 输入框

输入框组件，用于获取用户输入。

## 代码示例

### 基础用法

通过 `v-model` 绑定输入值。

<preview path="./demos/BasicUsage.vue"></preview>

### 禁用状态

通过 `disabled` 属性禁用输入框。

<preview path="./demos/DisabledState.vue"></preview>

### 可清空

通过 `clearable` 属性可清空输入内容。

<preview path="./demos/Clearable.vue"></preview>

### 密码框

通过 `type="password"` 设置密码输入框，`show-password` 属性可切换密码可见性。

<preview path="./demos/Password.vue"></preview>

### 带图标的输入框

<preview path="./demos/InputWithIcon.vue"></preview>

### 复合型输入框框

通过 `prepend`、`append`、`prefix` 和 `suffix` 插槽实现丰富的输入体验。

<preview path="./demos/InputWithSlots.vue"></preview>

### 文本域

通过 `type="textarea"` 设置多行文本输入。

<preview path="./demos/Textarea.vue"></preview>

### 自适应高度文本域

通过 `autosize` 属性设置文本域自适应高度，可以传入布尔值或配置对象 `{ minRows: number, maxRows: number }`。

<preview path="./demos/AutosizeTextarea.vue"></preview>

## LbInput Props

<table cellspacing="0" cellpadding="5">
  <colgroup>
    <col style="width: 10%;">
    <col style="width: 20%;">
    <col style="width: 50%;">
    <col style="width: 10%;">
    <col style="width: 10%;">
  </colgroup>
  <thead>
    <tr>
      <th>属性名</th>
      <th>说明</th>
      <th>类型</th>
      <th>可选值</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>modelValue</td>
      <td>绑定值</td>
      <td><code>string | number</code></td>
      <td>-</td>
      <td>''</td>
    </tr>
    <tr>
      <td>type</td>
      <td>输入框类型</td>
      <td>string</td>
      <td>text/password/textarea/number</td>
      <td>'text'</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td>占位文本</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>是否禁用</td>
      <td>boolean</td>
      <td>-</td>
      <td>false</td>
    </tr>
    <tr>
      <td>clearable</td>
      <td>是否可清空</td>
      <td>boolean</td>
      <td>-</td>
      <td>false</td>
    </tr>
    <tr>
      <td>showPassword</td>
      <td>是否显示切换密码按钮</td>
      <td>boolean</td>
      <td>-</td>
      <td>false</td>
    </tr>
    <tr>
      <td>autofocus</td>
      <td>是否自动获取焦点</td>
      <td>boolean</td>
      <td>-</td>
      <td>false</td>
    </tr>
    <tr>
      <td>autosize</td>
      <td>文本域自适应高度</td>
      <td><code>boolean | { minRows: number, maxRows: number }</code></td>
      <td>-</td>
      <td>false</td>
    </tr>
    <tr>
      <td>size</td>
      <td>输入框尺寸</td>
      <td>string</td>
      <td>large/default/small</td>
      <td>'default'</td>
    </tr>
    <tr>
      <td>rows</td>
      <td>文本域行数</td>
      <td><code>number | string</code></td>
      <td>-</td>
      <td>2</td>
    </tr>
    <tr>
      <td>maxlength</td>
      <td>最大输入长度</td>
      <td><code>number | string</code></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>minlength</td>
      <td>最小输入长度</td>
      <td><code>number | string</code></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>showWordLimit</td>
      <td>是否显示字数统计</td>
      <td>boolean</td>
      <td>-</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

## LbInput Events

| 事件名 | 说明               | 回调参数            |
| ------ | ------------------ | ------------------- |
| change | 输入值变化时触发   | (value: string)     |
| focus  | 获取焦点时触发     | (event: FocusEvent) |
| blur   | 失去焦点时触发     | (event: FocusEvent) |
| clear  | 点击清空按钮时触发 | -                   |

## LbInput Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| prepend | 复合型输入框前置内容 |
| append  | 复合型输入框后置内容 |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |
