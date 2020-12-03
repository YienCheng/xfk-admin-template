import store from '@/store';
import { hasPermission } from '@/libs/utils';

function checkPermission(el, binding) {
  const { value } = binding;
  if (!hasPermission(value, store.getters.roles)) {
    el.parentNode && el.parentNode.removeChild(el);
  }
}

export const directive = {
  name: 'permission',
  inserted(el, binding) {
    checkPermission(el, binding);
  },
  update(el, binding) {
    checkPermission(el, binding);
  }
};

export default {
  install(Vue) {
    // 注册全局指定
    Vue.directive('permission', directive);

    //全局mixin
    Vue.mixin({
      methods: {
        hasPermission(value) {
          return hasPermission(value, store.getters.roles);
        }
      }
    });
  }
};
