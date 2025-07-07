#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { program } from 'commander'

const __dirname = path.resolve()
// 配置命令行参数
program
  .requiredOption('-n, --name <name>', '组件名称（必填）')
  .requiredOption('-p, --prefix <prefix>', '组件前缀（如 el、van 等）', 'Lb')
  .option('--no-styles', '不创建样式文件')
  .option('--no-main-export', '不在 main.ts 中添加导出')
  .parse(process.argv)

const options = program.opts()
options.name = options.name.toLowerCase()
options.prefix = options.prefix.toLowerCase()

// 处理组件名称和前缀
const processName = (name, prefix) => {
  // 确保首字母大写
  const pascalName = name.replace(/(^|\s)\S/g, (match) => match.toUpperCase())
  // 如果有前缀，处理前缀
  const processedPrefix = prefix ? prefix.replace(/(^|\s)\S/g, (match) => match.toUpperCase()) : ''
  const fullName = processedPrefix + pascalName
  const kebabName = fullName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  return {
    pascalCase: fullName, // 转换为 PascalCase: LbButton
    kebabCase: kebabName, // 转换为 kebab-case: lb-button
    prefix: processedPrefix, // 前缀名称: lb
    baseUpperName: pascalName, // 去掉前缀后的名称
    baseName: name,
  }
}

const { pascalCase, kebabCase, baseUpperName, baseName } = processName(
  options.name,
  options.prefix,
)

const srcPath = path.join(__dirname, 'src')
// 项目基础路径 (根据你的项目结构调整)
const componentsDir = path.join(srcPath, 'components')
// 拿到 @/src/components
const baseComponentPath = path.join(componentsDir, baseName)
const baseStylePath = path.join(srcPath, 'styles')
// 创建组件目录结构
fs.mkdirSync(baseComponentPath, { recursive: true })
// 创建测试文件夹
fs.mkdirSync(path.join(baseComponentPath, '__tests__'), { recursive: true })
// 创建 Vue 组件文件
const vueTemplate = `
<template>
  <div class="${kebabCase}">
    <!-- ${pascalCase} 组件内容 -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { ${pascalCase}Props } from './types';

defineOptions({
  name: '${pascalCase}',
});

const props = defineProps<${pascalCase}Props>();
`

fs.writeFileSync(path.join(baseComponentPath, `${baseName}.vue`), vueTemplate)

// 创建 index.ts 文件
const indexTsTemplate = `
import ${baseUpperName}Component from './${baseName}.vue';
import { withInstall } from '../../utils/install.ts';
const ${baseUpperName} = withInstall(${baseUpperName}Component);
export default ${baseUpperName};
// 导出类型
export * from './types';
`

fs.writeFileSync(path.join(baseComponentPath, 'index.ts'), indexTsTemplate)

// 创建 types.ts 文件
const typesTsTemplate = `export interface ${pascalCase}Props {
  /**
   * 示例属性
   */
  exampleProp?: string;
  // 添加更多 props...
}

export type ${pascalCase}Emits = {
  /**
   * 示例事件
   */
  (e: 'example-event', value: string): void;
  // 添加更多 emits...
};
`

fs.writeFileSync(path.join(baseComponentPath, 'types.ts'), typesTsTemplate)

// 创建 SCSS 文件（如果启用）
if (options.styles) {
  const scssTemplate = `@use '@/styles/vars.scss' as *;

.${kebabCase} {
  // ${pascalCase} 组件样式
}
`

  fs.writeFileSync(path.join(baseStylePath, `${baseName}.scss`), scssTemplate)
}

// // 5. 在 main.ts 中添加导出（如果启用）
// if (options.mainExport) {
//   const mainTsPath = path.join(__dirname, 'src', 'main.ts')
//
//   if (fs.existsSync(mainTsPath)) {
//     const mainTsContent = fs.readFileSync(mainTsPath, 'utf-8')
//     const exportStatement = `export * from './components/${pascalCase}';`
//
//     if (!mainTsContent.includes(exportStatement)) {
//       const updatedContent = `${mainTsContent.trim()}\n${exportStatement}\n`
//       fs.writeFileSync(mainTsPath, updatedContent)
//     }
//   } else {
//     console.warn('未找到 main.ts 文件，跳过自动导出')
//   }
// }
//
// // 6. 在 components/index.ts 中添加导出（如果存在）
// const componentsIndexPath = path.join(componentsDir, 'index.ts')
// if (fs.existsSync(componentsIndexPath)) {
//   const content = fs.readFileSync(componentsIndexPath, 'utf-8')
//   const exportStatement = `export * from './${pascalCase}';`
//
//   if (!content.includes(exportStatement)) {
//     const updatedContent = `${content.trim()}\n${exportStatement}\n`
//     fs.writeFileSync(componentsIndexPath, updatedContent)
//   }
// }

console.log(`
组件创建成功！
名称: ${pascalCase}
组件入口: ${path.join(baseComponentPath, `index.ts`)}
组件路径: ${path.join(baseComponentPath, `${baseName}.vue`)}
组件样式路径: ${path.join(baseStylePath, `${baseName}.scss`)}
${options.styles ? '包含样式文件' : '不包含样式文件'}
`)
