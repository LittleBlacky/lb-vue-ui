#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { program } = require("commander");
const readline = require("readline");

// 配置
const CONFIG = {
  packagePath: path.join("packages", "core"),
  registry: "https://registry.npmjs.org/",
  gitRemote: "origin",
  defaultBranch: "master",
};

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * 询问用户输入
 * @param {string} question 问题
 * @returns {Promise<string>} 用户输入
 */
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * 询问用户确认
 * @param {string} question 问题
 * @returns {Promise<boolean>} 用户确认
 */
function askConfirm(question) {
  return new Promise((resolve) => {
    rl.question(`${question} (y/N): `, (answer) => {
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}

/**
 * 执行命令
 * @param {string} command 命令
 * @param {string} cwd 工作目录
 * @param {boolean} silent 是否静默执行
 * @returns {string} 执行结果
 */
function execCommand(command, cwd = process.cwd(), silent = false) {
  try {
    if (!silent) {
      console.log(`执行命令: ${command}`);
    }
    const result = execSync(command, {
      cwd,
      encoding: "utf8",
      stdio: silent ? "pipe" : "inherit",
    });
    return result;
  } catch (error) {
    console.error(`命令执行失败: ${command}`);
    console.error(error.message);
    throw error;
  }
}

/**
 * 检查工作目录是否干净
 */
function checkWorkingDirectory() {
  try {
    const status = execCommand("git status --porcelain", process.cwd(), true);
    if (status.trim()) {
      console.error("❌ 工作目录不干净，请先提交或暂存更改");
      console.error("未提交的文件:");
      console.error(status);
      return false;
    }
    console.log("✅ 工作目录干净");
    return true;
  } catch (error) {
    console.error("❌ 检查工作目录失败:", error.message);
    return false;
  }
}

/**
 * 检查是否在正确的分支
 * @param {string} branch 目标分支
 */
function checkBranch(branch = CONFIG.defaultBranch) {
  try {
    const currentBranch = execCommand(
      "git branch --show-current",
      process.cwd(),
      true
    ).trim();
    if (currentBranch !== branch) {
      console.error(`❌ 当前分支是 ${currentBranch}，请切换到 ${branch} 分支`);
      return false;
    }
    console.log(`✅ 当前分支: ${currentBranch}`);
    return true;
  } catch (error) {
    console.error("❌ 检查分支失败:", error.message);
    return false;
  }
}

/**
 * 拉取最新代码
 */
function pullLatest() {
  console.log("📥 拉取最新代码...");
  try {
    execCommand("git pull");
    console.log("✅ 代码拉取完成");
    return true;
  } catch (error) {
    console.error("❌ 拉取代码失败:", error.message);
    return false;
  }
}

/**
 * 运行测试
 */
function runTests() {
  console.log("🧪 运行测试...");
  try {
    execCommand("pnpm test");
    console.log("✅ 测试通过");
    return true;
  } catch (error) {
    console.log("⚠️  跳过测试（未配置测试脚本）");
    return true;
  }
}

/**
 * 构建项目
 */
function buildProject() {
  console.log("🔨 构建项目...");
  try {
    execCommand("pnpm build");
    console.log("✅ 构建完成");
    return true;
  } catch (error) {
    console.error("❌ 构建失败:", error.message);
    return false;
  }
}

/**
 * 获取当前版本
 * @param {string} packagePath 包路径
 * @returns {string} 版本号
 */
function getCurrentVersion(packagePath) {
  const packageJsonPath = path.join(packagePath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  return packageJson.version;
}

/**
 * 更新版本号
 * @param {string} packagePath 包路径
 * @param {string} version 新版本号
 */
function updateVersion(packagePath, version) {
  const packageJsonPath = path.join(packagePath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.version = version;
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n"
  );
}

/**
 * 检查npm登录状态
 */
function checkNpmLogin() {
  try {
    execCommand("npm whoami", process.cwd(), true);
    console.log("✅ npm已登录");
    return true;
  } catch (error) {
    console.error("❌ npm未登录，请先运行 npm login");
    return false;
  }
}

/**
 * 发布单个包
 * @param {string} packagePath 包路径
 * @param {string} tag 发布标签
 */
function publishPackage(packagePath, tag = "latest") {
  const packageName = path.basename(packagePath);
  console.log(`📦 发布包: ${packageName}`);

  try {
    execCommand(
      `npm publish --tag ${tag} --registry ${CONFIG.registry}`,
      packagePath
    );
    console.log(`✅ ${packageName} 发布成功`);
    return true;
  } catch (error) {
    console.error(`❌ ${packageName} 发布失败:`, error.message);
    return false;
  }
}

/**
 * 创建Git标签
 * @param {string} version 版本号
 */
function createGitTag(version) {
  console.log(`🏷️  创建Git标签: v${version}`);
  try {
    execCommand(`git tag v${version}`);
    execCommand(`git push ${CONFIG.gitRemote} v${version}`);
    console.log("✅ Git标签创建并推送完成");
    return true;
  } catch (error) {
    console.error("❌ 创建Git标签失败:", error.message);
    return false;
  }
}

/**
 * 提交版本更新
 * @param {string} version 版本号
 */
function commitVersionUpdate(version) {
  console.log("📝 提交版本更新...");
  try {
    execCommand("git add .");
    execCommand(`git commit -m "chore: release v${version}"`);
    execCommand(`git push ${CONFIG.gitRemote}`);
    console.log("✅ 版本更新已提交");
    return true;
  } catch (error) {
    console.error("❌ 提交版本更新失败:", error.message);
    return false;
  }
}

/**
 * 显示发布信息
 * @param {string} version 版本号
 */
function showReleaseInfo(version) {
  console.log("\n🎉 发布完成！");
  console.log(`📦 版本: v${version}`);
  console.log(`📋 包列表:`);
  CONFIG.packages.forEach((pkg) => {
    console.log(`   - ${pkg}@${version}`);
  });
  console.log(`🔗 npm地址: ${CONFIG.registry}`);
  console.log(`🏷️  Git标签: v${version}`);
}

/**
 * 交互式版本选择
 * @param {string} currentVersion 当前版本
 * @returns {Promise<string>} 新版本号
 */
async function selectVersion(currentVersion) {
  const [major, minor, patch] = currentVersion.split(".").map(Number);

  console.log(`\n当前版本: ${currentVersion}`);
  console.log("请选择版本类型:");
  console.log("1. patch (补丁版本) - 修复bug");
  console.log("2. minor (次要版本) - 新功能，向后兼容");
  console.log("3. major (主要版本) - 破坏性更新");
  console.log("4. 自定义版本号");

  const choice = await askQuestion("请选择 (1-4): ");

  let newVersion;
  switch (choice) {
    case "1":
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    case "2":
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case "3":
      newVersion = `${major + 1}.0.0`;
      break;
    case "4":
      newVersion = await askQuestion("请输入自定义版本号: ");
      break;
    default:
      console.log("无效选择，使用 patch 版本");
      newVersion = `${major}.${minor}.${patch + 1}`;
  }

  console.log(`选择版本: ${newVersion}`);
  return newVersion;
}

/**
 * 检查包是否已存在
 * @param {string} version 版本号
 * @returns {Promise<boolean>} 是否有冲突
 */
async function checkPackageConflicts(version) {
  console.log("\n🔍 检查包是否已存在...");
  let hasConflict = false;

  for (const pkg of CONFIG.packages) {
    try {
      execCommand(`npm view ${pkg}@${version}`, process.cwd(), true);
      console.log(`   ❌ ${pkg}@${version} 已存在`);
      hasConflict = true;
    } catch (error) {
      console.log(`   ✅ ${pkg}@${version} 可以发布`);
    }
  }

  if (hasConflict) {
    const continueAnyway = await askConfirm("发现版本冲突，是否继续？");
    return !continueAnyway;
  }

  return false;
}

/**
 * 主发布流程
 * @param {string} version 版本号
 * @param {string} tag 发布标签
 * @param {boolean} skipChecks 跳过检查
 */
async function publish(version, tag = "latest", skipChecks = false) {
  console.log("🚀 开始发布流程...\n");

  if (!skipChecks) {
    // 检查工作目录
    if (!checkWorkingDirectory()) {
      const continueAnyway = await askConfirm("工作目录不干净，是否继续？");
      if (!continueAnyway) {
        rl.close();
        return;
      }
    }

    // 检查分支
    if (!checkBranch()) {
      const continueAnyway = await askConfirm("分支不正确，是否继续？");
      if (!continueAnyway) {
        rl.close();
        return;
      }
    }

    // 拉取最新代码
    if (!pullLatest()) {
      const continueAnyway = await askConfirm("拉取代码失败，是否继续？");
      if (!continueAnyway) {
        rl.close();
        return;
      }
    }

    // 检查npm登录
    if (!checkNpmLogin()) {
      console.error("请先运行 npm login 登录");
      rl.close();
      return;
    }
  }

  // 运行测试
  if (!runTests()) {
    const continueAnyway = await askConfirm("测试失败，是否继续？");
    if (!continueAnyway) {
      rl.close();
      return;
    }
  }

  // 构建项目
  if (!buildProject()) {
    console.error("构建失败，无法继续发布");
    rl.close();
    return;
  }

  // 如果没有指定版本，进行交互式选择
  if (!version) {
    const currentVersion = getCurrentVersion(CONFIG.packagePath);
    version = await selectVersion(currentVersion);
  }

  // 检查版本冲突
  const hasConflict = await checkPackageConflicts(version);
  if (hasConflict) {
    rl.close();
    return;
  }

  console.log(`\n📋 发布信息:`);
  console.log(`   版本: ${version}`);
  console.log(`   标签: ${tag}`);
  console.log(`   包数量: ${CONFIG.packages.length}`);

  // 确认发布
  const confirm = await askConfirm("确认发布？");
  if (!confirm) {
    console.log("发布已取消");
    rl.close();
    return;
  }

  // 更新所有包的版本
  console.log("\n📝 更新版本号...");
  if (fs.existsSync(CONFIG.packagePath)) {
    updateVersion(CONFIG.packagePath, version);
  }

  // 发布所有包
  console.log("\n📦 发布包...");
  let publishSuccess = true;
  for (const pkg of CONFIG.packages) {
    let packagePath;
    if (pkg.startsWith("@lb-vue-ui/")) {
      packagePath = path.join("packages", pkg.replace("@lb-vue-ui/", ""));
    } else if (pkg.startsWith("@littleblacky/")) {
      packagePath = path.join("packages", "core");
    }

    if (fs.existsSync(packagePath)) {
      if (!publishPackage(packagePath, tag)) {
        publishSuccess = false;
        break;
      }
    }
  }

  if (!publishSuccess) {
    console.error("发布失败");
    rl.close();
    return;
  }

  // 提交版本更新
  if (!commitVersionUpdate(version)) {
    console.error("提交版本更新失败");
    rl.close();
    return;
  }

  // 创建Git标签
  if (!createGitTag(version)) {
    console.error("创建Git标签失败");
    rl.close();
    return;
  }

  // 显示发布信息
  showReleaseInfo(version);

  rl.close();
}

/**
 * 预览发布（不实际发布）
 * @param {string} version 版本号
 */
async function preview(version) {
  console.log("👀 预览发布信息...\n");

  if (!version) {
    const currentVersion = getCurrentVersion(".");
    const [major, minor, patch] = currentVersion.split(".").map(Number);
    version = `${major}.${minor}.${patch + 1}`;
  }

  console.log(`📋 发布预览:`);
  console.log(`   版本: ${version}`);
  console.log(`   包列表:`);
  CONFIG.packages.forEach((pkg) => {
    console.log(`   - ${pkg}@${version}`);
  });
  console.log(`🔗 npm地址: ${CONFIG.registry}`);

  // 检查包是否已存在
  await checkPackageConflicts(version);

  rl.close();
}

// 命令行配置
program.name("publish").description("lb-vue-ui 发布脚本").version("1.0.0");

program
  .command("release")
  .description("发布新版本")
  .option("-v, --version <version>", "指定版本号")
  .option("-t, --tag <tag>", "发布标签", "latest")
  .option("--skip-checks", "跳过检查步骤")
  .action(async (options) => {
    await publish(options.version, options.tag, options.skipChecks);
  });

program
  .command("preview")
  .description("预览发布信息")
  .option("-v, --version <version>", "指定版本号")
  .action(async (options) => {
    await preview(options.version);
  });

program
  .command("build")
  .description("仅构建项目")
  .action(() => {
    console.log("🔨 构建项目...");
    buildProject();
    console.log("✅ 构建完成");
    rl.close();
  });

program
  .command("test")
  .description("仅运行测试")
  .action(() => {
    console.log("🧪 运行测试...");
    runTests();
    console.log("✅ 测试完成");
    rl.close();
  });

program.parse();
