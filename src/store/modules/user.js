import { getUserInfo, login, getMenuList, logout } from '@/api/login';
import { getToken, setToken, removeToken, generateMenuList } from '@/libs/utils';
import routes from '@/router/routes';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  hasLogin: false
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    if (!token) removeToken();
    else setToken(token);
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  // 设置是否登录
  SET_HAS_LOGIN: (state, payload) => {
    state.hasLogin = payload;
  },
  // 重置用户信息
  RESET_USER_INFO: (state) => {
    state.token = undefined;
    state.name = undefined;
    state.avatar = undefined;
    state.introduction = undefined;
    state.hasLogin = false;
    state.roles = [];
    removeToken();
  }
};

const actions = {
  // 用户登录
  async login({ commit }, payload) {
    const { data = {} } = await login(payload);
    return data;
  },
  // 获取用户信息
  async getInfo({ commit }) {
    // 获取用户信息
    const { data: userInfo } = await getUserInfo();
    // 获取用户菜单信息
    const { list: menuList } = await getMenuList();
    // 生成用户权限列表
    const roles = menuList.filter((item) => item.component).map((item) => item.component);
    const { userName, avatar, introduction } = userInfo;
    // 设置用户信息及菜单
    commit('SET_ROLES', roles);
    commit('SET_NAME', userName);
    commit('SET_AVATAR', avatar);
    commit('SET_INTRODUCTION', introduction);
    commit('SET_HAS_LOGIN', true);
    commit('sideMenu/SET_MENU_LIST', generateMenuList(routes, roles), { root: true });
    return { userName, avatar, introduction, roles };
  },
  // 用户退出登录
  async logout({ commit, dispatch }) {
    const { data } = await logout();
    commit('RESET_USER_INFO');
    dispatch('tagsView/delAllViews', null, { root: true });
    return data;
  },
  // 获取用户权限
  async getUserRoles({ dispatch, state }) {
    if (!state.token) return Promise.reject(new Error('用户未登录'));
    if (state.hasLogin) return state.roles;
    const { roles } = await dispatch('getInfo');
    return roles;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
