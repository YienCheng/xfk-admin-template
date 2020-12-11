const requireModules = require.context('./modules', false, /\.js$/);

const apis = requireModules.keys().reduce((apis, path) => {
  const module = requireModules(path);
  const moduleKeys = Object.keys(module);
  const apiKeys = Object.keys(apis);

  moduleKeys.forEach((moduleKey) => {
    const existKey = apiKeys.find((apiKey) => apiKey === moduleKey);
    if (existKey) throw new Error(`api module has repeat key: ${existKey}`);
    apis[moduleKey] = module[moduleKey];
  });

  return apis;
}, {});

export default {
  install(Vue) {
    Vue.prototype.$api = apis;
  }
};
