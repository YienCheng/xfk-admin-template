import store from '@/store';
const enableErrorLog = JSON.parse(process.env.VUE_APP_ENABLE_ERROR_LOG || 'true');

export default {
  install(Vue) {
    if (enableErrorLog) {
      Vue.config.errorHandler = function(err, vm, info) {
        Vue.nextTick(() => {
          store.dispatch('errorLog/addErrorLog', {
            err,
            vm,
            info,
            url: window.location.href
          });
        });
      };
    }
  }
};
