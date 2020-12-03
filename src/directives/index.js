/**
 * 导入自定义指令
 * 只要是在modules文件夹下的js文件都会被引入
 */
const requireDirectives = require.context('./modules', false, /\.js$/);

const directives = requireDirectives
  .keys()
  .reduce((directives, path) => directives.concat(requireDirectives(path).default), []);

export default {
  install(Vue) {
    directives.forEach((directive) => {
      if (!directive.name) {
        throw new Error('自定义指令注册失败,请为指令提供name属性');
      } else {
        Vue.directive(directive.name, directive);
      }
    });
  }
};
