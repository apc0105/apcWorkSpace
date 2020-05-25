// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/classify',
    children: [
      {
        path: '/classify',
        name: 'classify',
        component: () => import('@/views/dashboard/home'),
        meta: { title: '首页', icon: 'project', permission: ['table'] }
      },
      {
        path: '/users',
        name: '用户管理',
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        component: () => import('@/views/users/index'),
        meta: {
          icon: 'user',
          title: '用户管理',
          keepAlive: true,
          permission: ['table']
        }
      },
      {
        path: '/dep',
        name: '部门管理',
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        component: () => import('@/views/dep/index'),
        meta: {
          icon: 'codepen',
          title: '部门管理',
          keepAlive: true,
          permission: ['table']
        }
      },
      {
        path: '/role',
        name: '角色管理',
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        component: () => import('@/views/role/index'),
        meta: { icon: 'user', title: '角色管理', keepAlive: true, permission: [ 'table' ] }
      },
      {
        path: '/process',
        name: '流程管理',
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        component: () => import('@/views/processCenter/index'),
        meta: { icon: 'user', title: '流程管理', keepAlive: true, permission: [ 'table' ] }
      }
    ]
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  // 首页
  {
    path: '/home',
    component: BlankLayout,
    redirect: '/home/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/home')
      }
    ]
  },
  // {
  //   path: '/menu',
  //   component: BlankLayout,
  //   redirect: '/menu/menu',
  //   children: [
  //     {
  //       path: 'menu',
  //       name: 'menu',
  //       component: () => import('@/views/home/menu')
  //     }
  //   ]
  // },
  // {
  //   path: '/test',
  //   component: BlankLayout,
  //   redirect: '/test/home',
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'TestHome',
  //       component: () => import('@/views/home/index')
  //     }
  //   ]
  // },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
