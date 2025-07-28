export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "root",
        "components",
        "docs",
        "utils",
        "theme-chalk",
        "core",
        "play",
        "workflow",
        "scripts",
      ],
    ], // 允许的 scope 列表
    "scope-empty": [2, "never"], // 强制要求 scope
    "type-enum": [
      2,
      "always",
      ["ci", "feat", "fix", "docs", "style", "refactor", "test", "chore"],
    ], // 允许的 type 列表
    "type-empty": [2, "never"], // 强制要求 type
  },
};
