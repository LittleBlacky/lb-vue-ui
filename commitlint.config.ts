export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [2, 'always', ['root', 'ui', 'editor']], // 允许的 scope 列表
        'scope-empty': [2, 'never'] // 强制要求 scope
    }
};