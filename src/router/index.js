import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';
import routes from './routes';
import { getPageTitle, defaultRoleLevel } from '@/libs/utils';

NProgress.configure({ showSpinner: false });

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 })
});

/**
 * 权限跳转
 * @param to
 * @param from
 * @param next
 * @returns {Promise<*>}
 */
const accessTurnTo = async (to, from, next) => {
  const {
    meta: { roleLevel = defaultRoleLevel, roles = [] }
  } = to;

  // roleLevel === 0 不进行校验
  if (roleLevel === 0) return next();

  // 获取用户权限 如果未登录将会跳转登录页面
  const userRoles = await store.dispatch('user/getUserRoles');

  // 如果页面权限等级是1 不进行权限校验
  if (roleLevel === 1) return next();

  const hasRole = userRoles.some((role) => roles.includes(role));

  // 如果有权限进行跳转
  if (hasRole) return next();

  // 没有权限跳转401
  next({ path: '/401' });
};

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  accessTurnTo(to, from, next).catch(() => {
    store.commit('user/RESET_USER_INFO');
    next(`/login?redirect=${to.path}`);
  });
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
