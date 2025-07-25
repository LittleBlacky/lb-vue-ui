import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {readdirSync} from "fs";
import {resolve} from "path";
import dts from "vite-plugin-dts";

function getDirectoriesSync(source: string): string[] {
  return readdirSync(source, {withFileTypes: true})
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: resolve(__dirname, "dist/types"),
    }),
  ],
  build: {
    outDir: resolve(__dirname, "dist/es"),
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "LbVueUi",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@vicons/ionicons5",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        assetFileNames: (assetInfo) => {
          const { name } = assetInfo;
          if (name === "index.css") return "style.css";
          if (assetInfo.type === "asset" && /\.(css|scss)$/i.test(name as string)) {
            return "theme-chalk/[name].[extname]";
          }
          return name as string;
        },
        globals: {
          vue: "Vue",
        },
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/components")) {
            const componentName = id.match(/packages\/components\/(\w+)/)?.[1];
            if (componentName) {
              return `components/${componentName}`;
            }
          }
          if (id.includes("/packages/utils")) {
            return "utils";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils")) {
            return "utils";
          }
          for (const dirname of getDirectoriesSync(
            resolve(__dirname, "../components")
          )) {
            if (id.includes(`/packages/components/${dirname}`)) {
              return `components/${dirname}`;
            }
          }
          if (id.includes("/packages/theme-chalk")) {
            return "theme-chalk";
          }
        },
      },
    },
  },
});
