# Button 按钮

## 基本用法

<demo vue="./demos/basic.vue"></demo>

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type   | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default' | 'default' | 按钮类型 |
| size   | 'medium' \| 'small' \| 'large' | 'medium' | 按钮大小 |
| disabled | boolean | false | 是否禁用 |
| round    | boolean | false | 是否圆角 |
| circle   | boolean | false | 是否圆形 |
| loading  | boolean | false | 是否加载中 |
| plain    | boolean | false | 是否朴素按钮 |
| text     | boolean | false | 是否文字按钮 |
| link     | boolean | false | 是否链接按钮 |

## 示例

### 不同类型

<demo vue="./demos/DifferentTypes.vue"></demo>

### 不同大小

<demo vue="./demos/DifferentSizes.vue"></demo>

### 禁用状态

<demo vue="./demos/DisabledState.vue"></demo>

### 图标按钮

<demo vue="./demos/IconButtons.vue"></demo>

### 圆角和圆形按钮

<demo vue="./demos/RoundAndCircle.vue"></demo>

### 加载状态

<demo vue="./demos/LoadingState.vue"></demo>

### 朴素按钮

<demo vue="./demos/PlainButtons.vue"></demo>

### 文字按钮

<demo vue="./demos/TextButtons.vue"></demo>

### 链接按钮

<demo vue="./demos/LinkButtons.vue"></demo>