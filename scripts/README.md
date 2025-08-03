# 脚本使用说明

本目录包含了 lb-vue-ui 项目的各种自动化脚本。

## 发布脚本

### 基础发布脚本 (publish.js)

一个简单的发布脚本，支持基本的发布功能。

#### 使用方法

```bash
# 发布新版本（交互式选择版本）
pnpm publish release

# 指定版本发布
pnpm publish release --version 1.2.3

# 发布到指定标签
pnpm publish release --tag beta

# 跳过检查步骤
pnpm publish release --skip-checks

# 预览发布信息
pnpm publish preview

# 仅构建项目
pnpm publish build

# 仅运行测试
pnpm publish test
```

### 增强版发布脚本 (publish-enhanced.js)

增强版发布脚本，提供更好的交互体验和错误处理。

#### 使用方法

```bash
# 发布新版本（完全交互式）
pnpm publish:enhanced release

# 指定版本发布
pnpm publish:enhanced release --version 1.2.3

# 发布到指定标签
pnpm publish:enhanced release --tag beta

# 跳过检查步骤
pnpm publish:enhanced release --skip-checks

# 预览发布信息
pnpm publish:enhanced preview

# 仅构建项目
pnpm publish:enhanced build

# 仅运行测试
pnpm publish:enhanced test
```

#### 增强功能

- **交互式版本选择**: 支持 patch/minor/major 版本选择
- **智能错误处理**: 遇到错误时提供继续选项
- **版本冲突检查**: 自动检查 npm 上是否已存在相同版本
- **用户确认**: 每个关键步骤都需要用户确认
- **详细日志**: 提供详细的执行日志和状态反馈

## 组件管理脚本

### 创建组件 (createComponent.js)

用于快速创建新的组件。

```bash
# 创建新组件
pnpm new:component <component-name>

# 示例
pnpm new:component button
```

### 删除组件 (removeComponent.js)

用于删除现有组件。

```bash
# 删除组件
pnpm del:component <component-name>

# 示例
pnpm del:component button
```

## 发布流程

### 标准发布流程

1. **检查环境**
   - 工作目录是否干净
   - 是否在正确的分支
   - npm 是否已登录

2. **代码更新**
   - 拉取最新代码
   - 运行测试
   - 构建项目

3. **版本管理**
   - 选择版本类型（patch/minor/major）
   - 更新所有包的版本号
   - 检查版本冲突

4. **发布**
   - 发布所有包到 npm
   - 提交版本更新到 Git
   - 创建 Git 标签

### 配置说明

发布脚本的配置在脚本文件顶部的 `CONFIG` 对象中：

```javascript
const CONFIG = {
  packages: [
    "@lb-vue-ui/components",
    "@lb-vue-ui/theme-chalk", 
    "@lb-vue-ui/utils",
    "@littleblacky/lb-vue-ui"
  ],
  registry: "https://registry.npmjs.org/",
  gitRemote: "origin",
  defaultBranch: "main"
};
```

- `packages`: 需要发布的包列表
- `registry`: npm 注册表地址
- `gitRemote`: Git 远程仓库名称
- `defaultBranch`: 默认分支名称

## 注意事项

1. **发布前准备**
   - 确保所有代码已提交
   - 确保在正确的分支上
   - 确保 npm 已登录

2. **版本管理**
   - 遵循语义化版本规范
   - 检查版本冲突
   - 确认版本号正确

3. **错误处理**
   - 发布失败时及时回滚
   - 检查错误日志
   - 必要时手动处理

4. **安全考虑**
   - 不要在公共环境使用
   - 保护好 npm token
   - 定期更新依赖

## 故障排除

### 常见问题

1. **npm 登录失败**
   ```bash
   npm login
   ```

2. **Git 权限问题**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **构建失败**
   ```bash
   pnpm install
   pnpm build
   ```

4. **版本冲突**
   - 检查 npm 上是否已存在相同版本
   - 选择新的版本号

### 获取帮助

如果遇到问题，可以：

1. 查看脚本的错误日志
2. 检查 npm 和 Git 配置
3. 手动执行各个步骤进行调试
4. 查看项目文档和 issue 