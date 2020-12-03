/**
 * axios封装
 */
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '@/store';
import { TOKEN_KEY } from '@/libs/utils';

/**
 * app code
 * @type {string}
 */
const appCode = process.env.VUE_APP_CODE;

/**
 * show error message
 */
const showErrorMessage = (mgs) => {
  Message({
    message: mgs,
    type: 'error',
    showClose: true
  });
};

/**
 * default request config
 */
export const defaultConfig = {
  baseURL: process.env.VUE_APP_API_BASE_URL
};

/**
 * default custom request headers
 */
export const getDefaultHeaders = () => {
  return {
    // 设置token请求头
    [TOKEN_KEY]: store.getters.token,
    // 应用code
    'app-code': appCode
  };
};

/**
 * axios instance
 */
const instance = axios.create(defaultConfig);

/**
 * request interceptors
 */
instance.interceptors.request.use(
  function(config) {
    // 设备断网
    if (navigator.onLine !== undefined && navigator.onLine === false) {
      return Promise.reject({ message: '网络链接错误，请检查网络链接！', code: -1 });
    }

    /**
     * 合并请求头
     */
    Object.assign(config.headers, getDefaultHeaders());

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

/**
 * axios的实例响应
 */
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    const { data = {} } = response;
    const code = data.code ?? -1;
    const xfkLoginToken = response.headers[TOKEN_KEY];

    // 拦截接口错误
    if (code !== 0) {
      const msg = data.message || '未定义错误';
      showErrorMessage(msg);
      return Promise.reject({ code, message: msg });
    }

    if (data.message) {
      Message({
        message: data.message,
        type: 'info',
        showClose: true
      });
    }

    if (xfkLoginToken) store.commit('user/SET_TOKEN', xfkLoginToken);

    return data;
  },
  function(error) {
    // 服务器相应错误
    if (!(error.code && error.code === -1)) error.message = '接口请求错误，请联系管理员';
    showErrorMessage(error.message);
    return Promise.reject(error);
  }
);

/**
 * Get请求
 * @param {*} url
 * @param {*} params
 */
export const get = (url, params) => {
  return instance.request({
    url,
    method: 'get',
    params
  });
};

/**
 * Post请求
 * @param {*} url
 * @param {*} params
 */
export const post = (url, data) => {
  return instance.request({
    url,
    method: 'post',
    data
  });
};

export default instance;
