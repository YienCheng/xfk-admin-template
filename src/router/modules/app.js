import Layout from '@/layout/index';

export default [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    meta: { roleLevel: 0 },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
        meta: { roleLevel: 0 }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { title: '登录', roleLevel: 0 }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
    meta: { roleLevel: 0 }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
    meta: { roleLevel: 1 }
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { roleLevel: 1 },
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'UserCenter',
        meta: { title: '用户中心', icon: 'user', noCache: true, roleLevel: 1 }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    meta: { roleLevel: 1 },
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: '首页', icon: 'dashboard', affix: true, roleLevel: 1 }
      }
    ]
  }
];
