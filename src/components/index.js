import Pagination from './Pagination';

/**
 * 全局组件组册
 */
export default {
  install(Vue) {
    // 分页组件
    Vue.component(Pagination.name, Pagination);
  }
};
