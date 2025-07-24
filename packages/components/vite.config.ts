/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";
import { resolve } from "path";
import fs from "fs-extra";
import packageJson from "./package.json"; // 引入现有的 package.json 文件
import vueJsx from "@vitejs/plugin-vue-jsx";
// 读取根目录的 README.md 文件内容
const rootReadmePath = path.join(
  __dirname,
  "..",
  "..",
  "README.md"
);
const readmeContent = fs.readFileSync(rootReadmePath, "utf-8");

const fileStr = `{
  "name": "@littleblacky/lb-ui",
  "version": "${packageJson.version}",
  "description": "基于vue3的组件库",
  "main": "./lib/packages/components/index.js",
  "module": "./es/packages/components/index.mjs",
  "types": "./es/index.d.ts",
  "homepage": "https://littleblacky.github.io/LbUI/",
  "repository": "https://github.com/LittleBlacky/LbUI",
  "files": [
    "./es",
    "./lib"
  ],
  "keywords": [
    "组件库",
    "lbui",
    "vue3",
    "vue",
    "typescript"
  ],
  "author": "littleblacky",
  "license": "ISC"
}
  `;

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
    vueJsx(),
    dts({
      // 确保 entryRoot 指向正确的入口目录
      entryRoot: "./",
      // 输出目录
      outDir: [
        resolve(__dirname, "../../build/es"),
        resolve(__dirname, "../../build/lib"),
      ],
      tsconfigPath: "../../tsconfig.json",
      // 包含需要生成类型声明的文件
      include: ["./**/*.ts", "./**/*.vue", "./index.ts"],
      // 排除 vite.config.ts 以及其他不需要的目录和文件
      exclude: ["node_modules", "dist", "./**/__test__", "./vite.config.ts"],
      copyDtsFiles: true,
      insertTypesEntry: true,
      compilerOptions: {
        declaration: true,
        emitDeclarationOnly: true,
        noEmit: false,
      },
    }),
  ],
  build: {
    target: "modules",
    //打包文件目录
    outDir: "es",
    //压缩
    minify: false,
    //css分离
    //cssCodeSplit: true,
    rollupOptions: {
      //忽略打包 vue 文件和 vite.config.ts
      external: ["vue", "./vite.config.ts"],
      input: "./index.ts",
      output: [
        {
          format: "es",
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].mjs",
          //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: "packages/components",
          exports: "named",
          //配置打包根目录
          dir: resolve(__dirname, "../../build/es"),
          // 假设这里可以处理 CSS 命名，将 components.css 重命名为 style.css
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "components.css") {
              return "style.css";
            }
            return "[name].[ext]";
          },
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: "packages/components",
          exports: "named",
          //配置打包根目录
          dir: resolve(__dirname, "../../build/lib"),
          // 假设这里可以处理 CSS 命名，将 components.css 重命名为 style.css
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "components.css") {
              return "style.css";
            }
            return "[name].[ext]";
          },
        },
      ],
      plugins: [
        {
          name: "package.json",
          closeBundle: () => {
            const outputDir = path.resolve(__dirname, "../../build");
            const filePath = path.resolve(outputDir, `package.json`);
            fs.outputFile(filePath, fileStr, "utf-8");
          },
        },
        {
          name: "README.md",
          closeBundle: () => {
            const outputDir = path.resolve(__dirname, "../../build");
            const filePath = path.resolve(outputDir, `README.md`);
            const readmePath = path.resolve(__dirname, "../../README.md");
            const readmeContent = fs.readFileSync(readmePath, "utf-8");
            fs.outputFile(filePath, readmeContent, "utf-8");
          },
        },
      ],
    },
    lib: {
      entry: "./index.ts",
      formats: ["es", "cjs"],
      name: "fan-ui",
    },
  },
  // 配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  // 测试配置
  test: {
    environment: "jsdom",
    globals: true,
    testTransformMode: {
      web: [".tsx", ".jsx"],
    },
    // 修改匹配测试文件的规则
    include: ["**/__test__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    // 覆盖率配置
    coverage: {
      // 启用覆盖率收集
      enabled: true,
      // 指定覆盖率收集器
      provider: "v8",
      // 生成多种格式的覆盖率报告
      reporter: ["html"],
      reportsDirectory: resolve(__dirname, "../../../coverage"),
    },
  },
});
