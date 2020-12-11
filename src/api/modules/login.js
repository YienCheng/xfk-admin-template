import request from '@/libs/request';
const userCenterBaseUrl = process.env.VUE_APP_USER_CENTER_BASE_URL;
const appCode = process.env.VUE_APP_CODE;

// 获取验证码
export const getCaptcha = (params) => {
  return request({
    baseURL: userCenterBaseUrl,
    url: '/captchaImage',
    method: 'get',
    params
  });
};

// 用户登录
export const login = (data) => {
  return request({
    baseURL: userCenterBaseUrl,
    url: '/captchaLogin',
    method: 'post',
    data
  });
};

// 用户退出
export const logout = (params) => {
  return request({
    baseURL: userCenterBaseUrl,
    url: '/logout',
    method: 'get',
    params
  });
};

// 获取用户菜单
export const getMenuList = () => {
  return request({
    baseURL: userCenterBaseUrl,
    url: '/system/menu/indexByAppCode',
    method: 'get',
    params: { appCode }
  });
};

// 获取用户信息
export const getUserInfo = (params) => {
  return request({
    baseURL: userCenterBaseUrl,
    url: '/getUserInfo',
    method: 'get',
    params
  });
};

// 用户修改密码
export const changePassword = (data) => {
  return request({
    baseURL: userCenterBaseUrl,
    url: '/updatePassword',
    method: 'post',
    data
  });
};
