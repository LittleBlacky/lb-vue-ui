export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["ci", "feat", "fix", "docs", "style", "refactor", "test", "chore"],
    ], // 允许的 type 列表
    "type-empty": [2, "never"], // 强制要求 type
  },
};
