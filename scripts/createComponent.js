const fs = require("fs");
const path = require("path");
const { program } = require("commander");

const packagesPath = path.join(__dirname, "../", "packages");
const componentsPath = path.join(packagesPath, "components");
const sassPath = path.join(packagesPath, "theme-chalk", "src");

function nameModify(name) {
  return name
    .split("-")
    .map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    })
    .join("");
}

/**
 * 创建Sass文件
 * @param {string} component 组件名称
 */
function createThemeChalkFile(component) {
  const sassFilePath = path.join(sassPath, `${component}.scss`);
  // 组件sass默认内容
  const sassContent = `@use 'common/vars' as *;
@use 'mixins/mixins.scss' as mix;

@include mix.b(${component}) {

};
`;
  fs.writeFileSync(sassFilePath, sassContent, "utf8");
}

/**
 * 创建组件目录
 * @param {string} component 组件名称
 */
function createComponentDirectory(component) {
  const componentPath = path.join(componentsPath, component);
  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath, { recursive: true });
  }
}

/**
 * 创建组件src目录
 * @param {string} component 组件名称
 */
function createSrcDirectory(component) {
  const srcPath = path.join(componentsPath, component, "src");
  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath, { recursive: true });
  }
}

/**
 * 创建组件component.vue文件
 * @param {string} component 组件名称
 */
function createComponentVue(component) {
  const componentVueFile = path.join(
    componentsPath,
    component,
    "src",
    `${component}.vue`,
  );
  const upperComponent = nameModify(component);
  const componentVueContent = `<template>
  <div :class="classes" :style="styles">
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import type {Lb${upperComponent}Props} from "./types";
import {createNamespace} from "@lb-vue-ui/utils/createNamespace";

const bem = createNamespace("${component}");

defineOptions({
  name: "Lb${upperComponent}",
});

const props = withDefaults(defineProps<Lb${upperComponent}Props>(), {
});

const classes = computed(() => {
  return [
    bem.b(),
  ];
});

const styles = computed(() => {
  return {};
});
</script>
`;
  fs.writeFileSync(componentVueFile, componentVueContent, "utf8");
}

/**
 * 创建组件类型定义文件
 * @param {string} component 组件名称
 */
function createTypesFile(component) {
  const upperComponent = nameModify(component);
  const typesPath = path.join(componentsPath, component, "src", "types.ts");
  const typesContent = `export interface Lb${upperComponent}Props {
  // 定义组件的属性
  // 例如: text?: string;
  }
  export interface Lb${upperComponent}Emits {
    // (e: 'click', event: MouseEvent): void;
  }`;
  fs.writeFileSync(typesPath, typesContent, "utf8");
}

/**
 * 创建style目录
 * @param {string} component 组件名称
 */
function createStyleDirectory(component) {
  const stylePath = path.join(componentsPath, component, "style");
  if (!fs.existsSync(stylePath)) {
    fs.mkdirSync(stylePath, { recursive: true });
  }
}

/**
 * 创建组件style文件
 * @param {string} component 组件名称
 */
function createStyleFile(component) {
  const stylePath = path.join(componentsPath, component, "style", "index.ts");
  const styleContent = `import "@lb-vue-ui/theme-chalk/src/${component}.scss";`;
  fs.writeFileSync(stylePath, styleContent, "utf8");
}

/**
 * 创建组件 packages/components/组件名称/index.ts 文件
 * @param {*} component 组件名称
 */
function createIndexEntry(component) {
  const indexPath = path.join(componentsPath, component, "index.ts");
  const upperComponent = nameModify(component);
  const indexContent = `import ${upperComponent} from "./src/${component}.vue";
import { withInstall } from "@lb-vue-ui/utils/install";

export const Lb${upperComponent} = withInstall(${upperComponent});

export default Lb${upperComponent};

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    Lb${upperComponent}: typeof Lb${upperComponent};
  }
};
`;
  fs.writeFileSync(indexPath, indexContent, "utf8");
}

/**
 * 在components/index.ts 中导出组件
 * @param {string} component 组件名称
 */
function exportComponent(component) {
  const indexPath = path.join(componentsPath, "index.ts");
  const appendContent = `export * from "./${component}";`;
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, "utf8");
    if (!indexContent.includes(appendContent)) {
      fs.appendFileSync(indexPath, appendContent, "utf8");
    }
  } else {
    fs.writeFileSync(indexPath, appendContent, "utf8");
  }
}

/**
 * 在theme-chalk/src/index.scss 中导出组件样式
 * @param {string} component 组件名称
 */
function exportThemeChalk(component) {
  const sassFilePath = path.join(sassPath, "index.scss");
  const appendContent = `@use "${component}.scss";`;
  if (fs.existsSync(sassFilePath)) {
    const sassContent = fs.readFileSync(sassFilePath, "utf8");
    if (!sassContent.includes(appendContent)) {
      fs.appendFileSync(sassFilePath, appendContent, "utf8");
    }
  } else {
    fs.writeFileSync(sassFilePath, appendContent, "utf8");
  }
}

function createComponent(component) {
  console.log(`开始创建组件: ${component}`);
  createComponentDirectory(component);
  createSrcDirectory(component);
  createComponentVue(component);
  createTypesFile(component);
  createStyleDirectory(component);
  createStyleFile(component);
  createIndexEntry(component);
  createThemeChalkFile(component);
  exportComponent(component);
  exportThemeChalk(component);
}

program.option("-n, --name <component>", "组件名称").action((options) => {
  const component = options.name;
  createComponent(component);
});

program.parse(process.argv);
