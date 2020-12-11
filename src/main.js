import Vue from 'vue';
import Cookies from 'js-cookie';
import Element from 'element-ui';
import 'normalize.css/normalize.css';
import App from '@/App';
import store from '@/store';
import router from '@/router';
import errorLog from '@/plugins/error-log';
import permission from '@/plugins/permission';
import filters from '@/filters';
import icon from '@/icons';
import directives from '@/directives';
import components from '@/components';
import api from '@/api';

import '@/styles/element-variables.scss';
import '@/styles/index.scss';

/**
 * register element-ui
 */
Vue.use(Element, {
  size: Cookies.get('size') || 'small'
});

/**
 * register error log plugin
 */
Vue.use(errorLog);

/**
 * register global filter
 */
Vue.use(filters);

/**
 * register permission plugin
 */
Vue.use(permission);

/**
 * register global svg icon
 */
Vue.use(icon);

/**
 * register global directives
 */
Vue.use(directives);

/**
 * register global components
 */
Vue.use(components);

/**
 * register global api
 */
Vue.use(api);

/**
 * close production tip
 */
Vue.config.productionTip = false;

/**
 * init vue root instance
 */
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
