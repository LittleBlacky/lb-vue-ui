import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";
import {readdirSync} from "fs";

function getDirectoriesSync(source: string): string[] {
  return readdirSync(source, {withFileTypes: true})
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: resolve(__dirname, "dist/umd"),
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "LbVueUi",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo) => {
          const { name } = assetInfo;
          if (name === "style.css") return "index.css";
          if (assetInfo.type === "asset" && /\.(css|scss)$/i.test(name as string)) {
            return "theme-chalk/[name].[extname]";
          }
          return name as string;
        },
        globals: {
          vue: "Vue",
        },
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
