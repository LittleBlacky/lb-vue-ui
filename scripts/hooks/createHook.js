const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const { camelToKebab, kebabToCamel } = require("../utils/name-transform.js");

const rootPath = path.resolve(__dirname, "..", "..", "packages");
const hooksRootPath = path.resolve(rootPath, "hooks");
const prefix = "use";

// 生成指定hook的目录
function createHooksDir(name) {
  const hooksDirPath = path.resolve(hooksRootPath, name);
  if (!fs.existsSync(hooksDirPath)) {
    fs.mkdirSync(hooksDirPath);
  }
}

// 生成hook的index.ts基本文件
function createHooksFile(name, description) {
  const hooksFilePath = path.resolve(
    hooksRootPath,
    camelToKebab(name),
    "index.ts"
  );
  if (!fs.existsSync(hooksFilePath)) {
    fs.writeFileSync(
      hooksFilePath,
      `// ${description}\n export const ${name} = () => {\n\t// Your hook code here\n}`
    );
  }
}

// 在hooks目录下的index.ts, 增加 hook
function exportHooks(name) {
  name = camelToKebab(name);
  const hooksIndexPath = path.resolve(hooksRootPath, "index.ts");
  const hooksIndexContent = fs.readFileSync(hooksIndexPath, "utf-8");
  if (!hooksIndexContent.includes(`export * from './${name}';`)) {
    fs.appendFileSync(hooksIndexPath, `\nexport * from './${name}';`, "utf8");
  }
}

// 组合上述步骤，自动化生成一个hook的基本文件
function createHooks(name, description) {
  console.log(`创建${name} hook目录`);
  createHooksDir(camelToKebab(name));
  console.log(`创建${name} hook文件`);
  createHooksFile(name, description);
  console.log(`在hooks目录下index.ts中增加${name} hook`);
  exportHooks(name);
}

program
  .option("-n, --name <name>")
  .option("-d, --description <description>", "")
  .action((options) => {
    let { name, description, path } = options;
    if (name.startsWith(prefix)) {
      name = name.slice(prefix.length);
    }
    createHooks(`${prefix}${name}`, description, path);
  });

program.parse(process.argv);
