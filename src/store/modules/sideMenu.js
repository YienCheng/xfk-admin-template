const state = {
  menuList: []
};

const mutations = {
  SET_MENU_LIST: (state, payload) => {
    state.menuList = payload;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
