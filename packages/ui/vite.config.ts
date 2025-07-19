import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import fs from 'fs'

// 获取所有组件的入口
function getComponentsEntrys() {
  const componentsDir = resolve(__dirname, 'src/components')
  const files = fs.readdirSync(componentsDir)
  return files.reduce(
    (entrys: Record<string, string>, component) => {
      const componentPath = resolve(componentsDir, component, 'index.ts')
      if (fs.existsSync(componentPath)) entrys[`components/${component}`] = componentPath
      return entrys
    },
    {} as Record<string, string>,
  )
}

// 获取所有样式入口
function getStyleEntries() {
  const stylesDir = resolve(__dirname, 'src/styles')
  const files = fs.readdirSync(stylesDir)
  return files
    .filter((file) => file.endsWith('.scss'))
    .reduce(
      (entries, file) => {
        const name = file.replace('.scss', '')
        entries[`styles/${name}`] = resolve(stylesDir, file)
        return entries
      },
      {} as Record<string, string>,
    )
}

function getUtilsEntries() {
  const utilsDir = resolve(__dirname, 'src/utils')
  const files = fs.readdirSync(utilsDir)
  return files
    .filter((file) => file.endsWith('.ts'))
    .reduce(
      (entries, file) => {
        const name = file.replace('.ts', '')
        entries[`utils/${name}`] = resolve(utilsDir, file)
        return entries
      },
      {} as Record<string, string>,
    )
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      outDir: 'dist/types',
      tsconfigPath: 'tsconfig.app.json',
    }),
  ],
  build: {
    outDir: `dist/`,
    lib: {
      // 作为库构建时的入口
      entry: {
        index: resolve(__dirname, './src/main.ts'),
        ...getUtilsEntries(),
        ...getStyleEntries(),
        ...getComponentsEntrys(),
      },
      // 暴露的全局变量
      name: 'lbUi',
      // 入口打包结果的文件名
      fileName: (format, entryName) => {
        if (entryName === 'index') {
          return format === 'es' ? 'index.js' : 'index.cjs'
        }
        return format === 'es' ? `${entryName}.js` : `${entryName}.cjs`
      },
      formats: ['es', 'cjs'],
    },
    cssCodeSplit: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      // 每个入口的输出结果处理
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names[0]?.endsWith('.css')) {
            return `[name][extname]`
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
