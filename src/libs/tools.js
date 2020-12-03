/**
 * 判断是否为 null 或 undefined
 * @param value
 * @returns {boolean}
 */
export const isNil = (value) => {
  return value === null || value === undefined;
};

/**
 * 判断是否是数组
 * @param value
 * @returns {arg is any[]}
 */
export const isArray = (value) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
  return Array.isArray(value);
};

/**
 * 判断是否为空
 * @param value
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  return isNil(value) || (isArray(value) && value.length === 0) || value === '';
};

/**
 * 判断是否是链接开头
 * @param path
 * @returns {boolean}
 */
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};
