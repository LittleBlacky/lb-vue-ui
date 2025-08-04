const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const { camelToKebab } = require("../utils/name-transform");

const rootPath = path.resolve(__dirname, "..", "..", "packages");
const hooksRootPath = path.resolve(rootPath, "hooks");
const prefix = "use";

// 删除hook文件夹
function delHookDir(name) {
  const hookPath = path.resolve(hooksRootPath, name);
  if (fs.existsSync(hookPath)) {
    fs.rmdirSync(hookPath, { recursive: true });
    console.log(`删除${name} hook成功`);
  }
}

// 删除hook在packages/hooks/index.ts中的引用
function delHookImport(name) {
  const indexPath = path.resolve(hooksRootPath, "index.ts");
  const indexContent = fs.readFileSync(indexPath, "utf-8");
  const newContent = indexContent.replace(`export * from './${name}';`, "");
  fs.writeFileSync(indexPath, newContent, "utf-8");
}

function delHook(name) {
  delHookDir(name);
  delHookImport(name);
}

program.option("-n, --name <name>").action((options) => {
  let { name } = options;
  name = camelToKebab(name);
  if (!name.startsWith(prefix)) {
    name = prefix + name;
  }
  delHook(name);
});

program.parse(process.argv);
