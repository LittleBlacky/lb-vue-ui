import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve, join } from "path";
import fg from "fast-glob";
import dts from "vite-plugin-dts";
import { rollupPluginCompileStyleEntry } from "./plugins/compileStyleEntry";

const rootPath = resolve(__dirname, "../");
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
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: resolve("dist/types"),
    }),
  ],
  build: {
    outDir: join("dist", "es"),
    lib: {
      entry: files,
      name: "LbVueUi",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@vicons/ionicons5",
        "@floating-ui/dom",
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
