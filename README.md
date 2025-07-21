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
import { createApp } from 'vue';
import LbVue from '@lb-vue/ui';
import '@lb-vue/ui/dist/style.css';

const app = createApp(App);
app.use(LbVue);
app.mount('#app');
```

##### 按需导入
```javascript
import { createApp } from 'vue';
import { LbButton, LbInput } from '@lb-vue/ui';
import '@lb-vue/ui/dist/style.css';

const app = createApp(App);
app.use(LbButton).use(LbInput);
app.mount('#app');
```

##### 自动按需导入
需要安装 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 插件

```javascript
// vite.config.js
import Components from 'unplugin-vue-components/vite';
import { LbResolver } from '@lb-vue/ui/resolver';

export default {
  plugins: [
    Components({
      resolvers: [LbResolver()]
    })
  ]
}
```

#### 参与贡献
1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

#### 许可证
MIT
