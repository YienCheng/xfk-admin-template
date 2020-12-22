import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';
import routes from './routes';
import { getPageTitle, defaultRoleLevel, hasPermission } from '@/libs/utils';

NProgress.configure({ showSpinner: false });

Vue.use(Router);

/**
 *
 * hidden: true                   侧边栏是否显示当前页面：true/false, 如果后台返回该菜单的visible属性为false，则次属性无效
 * alwaysShow: true               当菜单侧边栏只有一个子菜单时是否展示根菜单：true/false
 * redirect: noRedirect           面包屑导航点击跳转，如果设置为 noRedirect 将不进行跳转
 * name:'router-name'             路由name，必须设置，必须和页面组件name值一致，不然缓存不生效
 * meta : {
    roles: ['admin','editor']    页面权限控制
    title: 'title'               侧边栏 面包屑导航 title 设置
    icon: 'svg-name'/'el-icon-x' 侧边栏icon，支持自定义svg和el-icon
    noCache: true                是否缓存当前页面：true/false 默认为false
    affix: true                  是否将当前页面固定到tag-view: true/false
    breadcrumb: false            是否在面包屑中展示导航：true/false 默认false
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    roleLevel: 2                 if set 0, the page will not verify permissions, default is in env config file
                                 if set 1, the page only login to access
                                 if set 2, the page must be configure user's permissions by usercenter to access
  }
 */

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
    meta: { roleLevel = defaultRoleLevel, roles }
  } = to;

  // roleLevel === 0 不进行校验
  if (roleLevel === 0) return next();

  // 获取用户权限 如果未登录将会跳转登录页面
  const userRoles = await store.dispatch('user/getUserRoles');

  // 如果页面权限等级是1 不进行权限校验
  if (roleLevel === 1) return next();

  const hasRole = hasPermission(roles, userRoles);

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
