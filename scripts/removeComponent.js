const fs = require("fs");
const path = require("path");
const { program } = require("commander");

const packagesPath = path.join(__dirname, "../", "packages");
const componentsPath = path.join(packagesPath, "components");

/**
 * 删除组件所在文件夹
 * @param {string} component
 */
function removeComponentDir(component) {
  const componentPath = path.join(componentsPath, component);
  if (fs.existsSync(componentPath)) {
    fs.rmSync(componentPath, { recursive: true });
  }
}

/**
 * 从packages/components/index.ts去掉该组件的导出
 * @param {string} component 组件名称
 */
function removeComponentExport(component) {
  const indexPath = path.join(componentsPath, "index.ts");
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, "utf8");
    indexContent = indexContent.replace(`export * from "./${component}";`, "");
    fs.writeFileSync(indexPath, indexContent, "utf8");
  }
}

/**
 * 从packages/theme-chalk/src/index.scss中去掉该组件的导入
 * @param {string} component 组件名称
 */
function removeThemeChalkUse(component) {
  const indexPath = path.join(packagesPath, "theme-chalk", "src", "index.scss");
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, "utf8");
    indexContent = indexContent.replace(`@use "${component}.scss";`, "");
    fs.writeFileSync(indexPath, indexContent, "utf8");
  }
}

/**
 * 删除组件的scss文件
 * @param {string} component 组件名称
 */
function removeComponentScss(component) {
  const scssPath = path.join(
    packagesPath,
    "theme-chalk",
    "src",
    `${component}.scss`
  );
  if (fs.existsSync(scssPath)) {
    fs.unlinkSync(scssPath);
  }
}

function removeComponent(component) {
  console.log(`开始删除组件: ${component}`);
  removeComponentDir(component);
  removeComponentExport(component);
  removeThemeChalkUse(component);
  removeComponentScss(component);
}

program.option("-n, --name <component>", "组件名称").action((options) => {
  const component = options.name;
  removeComponent(component);
});

program.parse(process.argv);
