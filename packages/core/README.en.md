# lb-vue-ui

#### Introduction
lb-vue-ui is a Vue 3 based component library, providing a series of high-quality UI components to help developers quickly build modern Web applications.

#### User Manual Link
https://littleblacky.github.io/lb-vue-ui/

#### Software Architecture
- Built with Vue 3 and TypeScript
- Developed using Composition API
- Supports on-demand loading
- Provides complete TypeScript type definitions

#### Installation
```bash
# Using npm
npm install @littleblacky/lb-vue-ui

# Using yarn
yarn add @littleblacky/lb-vue-ui

# Using pnpm
pnpm add @littleblacky/lb-vue-ui
```

#### Usage

##### Full Import
```javascript
import { createApp } from "vue";
import LbVue from "@littleblacky/lb-vue-ui";
import "@littleblacky/lb-vue-ui/style";

const app = createApp(App);
app.use(LbVue);
app.mount("#app");
```

##### On-demand Import
```vue
<script setup>
import { RouterView } from "vue-router";
import { LbButton } from "@littleblacky/lb-vue-ui";
import "@littleblacky/lb-vue-ui/theme-chalk/button.css";
</script>

<template>
  <lb-button>Button</lb-button>
</template>
```

##### Automatic On-demand Import
Requires installing the [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) plugin.

```javascript
// vite.config.js
import Components from "unplugin-vue-components/vite";
import { LbResolver } from '@littleblacky/lb-vue-ui/resolver';

export default {
  plugins: [
    Components({
      resolvers: [LbResolver()],
    }),
  ],
};
```
Subsequent direct use of components, no manual import required.
```vue
<script setup>
  
</script>

<template>
  <lb-button>Button</lb-button>
</template>

```