import * as appFilters from './app';

const filters = [appFilters].reduce((filters, currentFilter = {}) => {
  Object.keys(currentFilter).forEach((key) => {
    if (filters[key]) throw new Error(`global filters has repeat key: ${key}`);
    filters[key] = currentFilter[key];
  });
  return filters;
}, {});

/**
 * 全局filter在次函数中安装
 */
export default {
  install(Vue) {
    Object.keys(filters).forEach((key) => {
      Vue.filter(key, appFilters[key]);
    });
  }
};
