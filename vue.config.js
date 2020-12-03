const path = require('path');
const vConsolePlugin = require('vconsole-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';
const enableMobileConsole = JSON.parse(process.env.ENABLE_MOBILE_CONSOLE);
const resolve = (dir) => path.resolve(__dirname, dir);
/**
 * If you want change default settings,
 * place read vue-cli@3 configuration reference: https://cli.vuejs.org/config/
 */

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  lintOnSave: isDevelopment ? false : false,
  productionSourceMap: false,
  outputDir: process.env.OUT_PUT_DIR,
  chainWebpack: (config) => {
    // set html default title
    config.plugin('html').tap((args) => {
      args[0].title = `${process.env.VUE_APP_BRAND}${process.env.VUE_APP_TITLE}`;
      return args;
    });

    // set mobile vConsole
    config.plugin('vConsole').use(vConsolePlugin, [{ enable: enableMobileConsole }]);

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  },
  devServer: {
    proxy: {
      '/xxxx': {
        target: process.env.PROXY_USER_CENTER_BASE_URL,
        pathRewrite: { '^/xxxx': '' },
        changeOrigin: true
      },
      '/api': {
        target: process.env.PROXY_API_BASE_URL,
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  }
};
