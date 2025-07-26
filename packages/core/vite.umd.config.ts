import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { rollupPluginCompileStyleEntry } from "./plugins/compileStyleEntry";

const rootPath = resolve(__dirname, '../');
export default defineConfig({
  plugins: [rollupPluginCompileStyleEntry(), vue()],
  build: {
    outDir: resolve("dist/"),
    lib: {
      entry: ["./index.ts"],
      name: "LbVueUi",
      formats: ["umd", "iife"],
      fileName: (format) => `lb-vue-ui.${format}.js`,
    },
    rollupOptions: {
      external: [
        "vue",
        "@vicons/ionicons5",
        "@popperjs/core",
        "async-validator",
        /@lb-vue-ui\/theme-chalk\/.*/,
      ],
      output: {
        exports: "named",
        preserveModulesRoot: rootPath,
      },
    },
  },
  resolve: {
    alias: {
      "@lb-vue-ui/core": resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ["vue"],
  },
});
