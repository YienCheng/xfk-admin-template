import Cookies from 'js-cookie';
import { isArray, isEmpty } from '@/libs/tools';

const { VUE_APP_TITLE, VUE_APP_BRAND, VUE_APP_DEFAULT_ROLE_LEVEL } = process.env;
const title = `${VUE_APP_BRAND}${VUE_APP_TITLE}`;

/**
 * 默认的权限级别
 * @type {number}
 * 0 非登录用户也可访问
 * 1 登录用户才可访问
 * 2 登录并具有菜单权限才可访问
 */
export const defaultRoleLevel = parseInt(VUE_APP_DEFAULT_ROLE_LEVEL || '2');

/**
 * toke key
 * @type {string}
 */
export const TOKEN_KEY = 'xfk-login-token';

/**
 * 移除token
 * @returns {*}
 */
export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}

/**
 * 获取token
 * @returns {*}
 */
export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

/**
 * 设置token
 * @param token
 * @returns {*}
 */
export function setToken(token) {
  if (isEmpty(token)) return removeToken();
  else return Cookies.set(TOKEN_KEY, token);
}

/**
 * 获取页面title
 * @param pageTitle
 * @returns {string}
 */
export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

/**
 * 判断是否有权限
 * @param value
 * @param roles
 * @returns {*}
 */
export const hasPermission = (value, roles) => {
  if (typeof value === 'string') value = value.split(',');
  if (!isArray(value)) value = [];
  return roles.some((role) => value.includes(role));
};

/**
 * 递归生成菜单
 * @param routes
 * @param roles
 */
export const generateMenuList = (routes, roles) => {
  return routes.reduce((list, route) => {
    const routeRoles = route?.meta?.roles;
    const roleLevel = route?.meta?.roleLevel ?? defaultRoleLevel;
    const tmp = { ...route };
    if (roleLevel === 1 || hasPermission(routeRoles, roles)) {
      if (tmp.children) {
        tmp.children = generateMenuList(tmp.children, roles);
      }
      list.push(tmp);
    }
    return list;
  }, []);
};
