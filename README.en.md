# lb-vue

#### Introduction
lb-vue is a Vue 3 based component library, providing a series of high-quality UI components to help developers quickly build modern Web applications.

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
npm install @lb-vue/ui

# Using yarn
yarn add @lb-vue/ui

# Using pnpm
pnpm add @lb-vue/ui
```

#### Usage

##### Full Import
```javascript
import { createApp } from "vue";
import LbVue from "@lb-vue/ui";
import "@lb-vue/ui/dist/style.css";

const app = createApp(App);
app.use(LbVue);
app.mount("#app");
```

##### On-demand Import
```vue
<script setup>
import { RouterView } from "vue-router";
import { LbButton } from "@lb-vue/ui";
import "@lb-vue/ui/styles/button.css";
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
import { LbResolver } from "@lb-vue/ui/resolver";

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

#### License
MIT
