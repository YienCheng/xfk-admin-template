const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  errorLogs: (state) => state.errorLog.logs,
  // 侧边栏菜单
  menuList: (state) => state.sideMenu.menuList,
  // 是否登录
  hasLogin: (state) => state.user.hasLogin
};
export default getters;
