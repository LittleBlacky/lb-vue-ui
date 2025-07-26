import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [
    vueJsx({
      // 自动注入h函数，避免手动导入
      jsxInject: "import { h } from 'vue';",
    }),
  ],
});
