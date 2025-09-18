# Loading 加载

用于页面和区块的加载中状态。

## 指令用法

### 基础指令

使用 `v-loading` 指令可以方便地控制加载状态。

<preview path="./demos/directive-basic.vue" />

### 指令修饰符
使用 <code>.fullscreen</code> 修饰符可以创建全屏加载状态。
<preview path="./demos/directive-modifiers.vue" />

## 服务式调用

### 全屏加载

通过调用 `LbLoading.service()` 方法可以创建全屏加载状态。
::: tip 注意 
服务式调用全屏加载采用单例模式，多次调用会复用同一个实例。
::: 
<preview path="./demos/service-fullscreen.vue" />

### 局部加载

通过指定 `target` 选项可以在指定区域显示加载状态。

<preview path="./demos/service-local.vue" />

### 多实例管理

可以同时管理多个局部加载实例。

<preview path="./demos/service-multiple.vue" />

## Loading

### props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| text | 显示的文本 | string | — |
| spinner | 自定义加载图标类名 | string | — |
| background | 遮罩背景色 | string | — |
| fullscreen | 是否全屏显示 | boolean | false |
| lock | 是否锁定页面滚动 | boolean | false |
| customClass | 自定义类名 | string | — |
| visible | 是否显示 | boolean | true |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| closed | 关闭后触发 | — |

## v-loading

### options

| 修饰符 | 说明 |
|--------|------|
| fullscreen | 全屏显示 |
| lock | 锁定页面滚动 |

**绑定值类型：**

- `boolean` - 控制显示/隐藏
- `string` - 显示文本
- `LbLoadingOptions` - 完整配置对象

## LbLoading.service(options)

创建一个 Loading 实例。

**参数：**

| 参数名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| text | 显示的文本 | string | 加载中... |
| spinner | 自定义加载图标类名 | string | — |
| background | 遮罩背景色 | string | rgba(0, 0, 0, 0.7) |
| fullscreen | 是否全屏显示 | boolean | true（无target时）/ false（有target时） |
| lock | 是否锁定页面滚动 | boolean | true |
| customClass | 自定义类名 | string | — |
| target | 目标元素 | HTMLElement \| string | — |

**返回值：**

返回一个 Loading 实例，包含以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| close | 关闭 Loading | — |
| setText | 设置文本 | text: string |
| setVisible | 设置显示状态 | visible: boolean |

### 全局方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| showLoading | 显示 Loading | options?: LbLoadingOptions |
| closeLoading | 关闭 Loading | target?: 'fullscreen' \| 'all' \| LbLoadingInstance |
| updateLoadingText | 更新文本 | text: string, target?: 'fullscreen' \| 'all' \| LbLoadingInstance |