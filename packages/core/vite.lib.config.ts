import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve, join } from "path";
import fg from "fast-glob";
import { rollupPluginCompileStyleEntry } from "./plugins/compileStyleEntry";

const rootPath = resolve(__dirname, '../');
const files = await fg.glob("**/index.{ts, vue, js}", {
  cwd: rootPath,
  absolute: true,
  onlyFiles: true,
  ignore: ["**/node_modules/**", "**/dist/**", "**/theme-chalk/**"],
});

export default defineConfig({
  plugins: [
    rollupPluginCompileStyleEntry(),
    vue(),
  ],
  build: {
    outDir: join("dist", "lib"),
    lib: {
      entry: files,
      name: "LbVueUi",
      formats: ["cjs"],
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
        preserveModules: true,
        exports: "named",
        preserveModulesRoot: rootPath,
      },
    },
  },
});
