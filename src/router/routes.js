const requireRoutes = require.context('./modules', false, /\.js$/);

const routes = requireRoutes
  .keys()
  .reduce((routes, path) => routes.concat(requireRoutes(path).default), []);

export default [...routes, { path: '*', redirect: '/404', hidden: true }];
