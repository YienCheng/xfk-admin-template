const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': isProduction ? 'warn' : 'off',
    'no-debugger': isProduction ? 'warn' : 'off',
    'vue/no-unused-components': isProduction ? 'error' : 'off', // 检测未使用组件
    'no-unused-vars': isProduction ? 'error' : 'off', // 检测未使用变量
    'no-empty': isProduction ? 'error' : 'off' // 检测空代码块
  }
};
