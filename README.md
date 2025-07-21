# lb-vue

#### 介绍

lb-vue 是一个基于 Vue 3 的组件库，提供了一系列高质量的 UI 组件，帮助开发者快速构建现代化的 Web 应用。

#### 使用手册链接

https://littleblacky.github.io/lb-vue-ui/

#### 软件架构

- 基于 Vue 3 和 TypeScript 构建
- 使用 Composition API 编写
- 支持按需加载
- 提供完整的 TypeScript 类型定义

#### 安装教程

```bash
# 使用 npm
npm install @lb-vue/ui

# 使用 yarn
yarn add @lb-vue/ui

# 使用 pnpm
pnpm add @lb-vue/ui
```

#### 使用说明

##### 全量导入

```javascript
import { createApp } from "vue";
import LbVue from "@lb-vue/ui";
import "@lb-vue-ui/ui/dist/style.css";

const app = createApp(App);
app.use(LbVue);
app.mount("#app");
```

##### 按需导入

```vue
<script setup>
import { RouterView } from "vue-router";
import { LbButton } from "@lb-vue-ui/ui";
import "@lb-vue-ui/ui/styles/button.css";
</script>

<template>
  <lb-button>按钮</lb-button>
</template>
```

##### 自动按需导入

需要安装 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 插件

```javascript
// vite.config.js
import Components from "unplugin-vue-components/vite";
import { LbResolver } from "@lb-vue-ui/ui/resolver";

export default {
  plugins: [
    Components({
      resolvers: [LbResolver()],
    }),
  ],
};
```
后续可以直接使用组件，不需要手动引入
```vue
<script setup>
  
</script>

<template>
  <lb-button>按钮</lb-button>
</template>

```

#### 许可证

MIT
