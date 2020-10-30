import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/training /list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/userlist',
    children: [{
      path: 'userlist',
      name: 'Userlist',
      component: () => import('@/views/userlist/index'),
      meta: { title: '用户管理', icon: 'el-icon-user' }
    }]
  },

  {
    path: '/training',
    component: Layout,
    redirect: '/training/list',
    name: 'training',
    meta: { title: '培训管理', icon: 'el-icon-collection' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/training/list'),
        meta: { title: '课程列表', icon: 'el-icon-collection', keepAlive: true }
      },
      {
        path: 'signRecord',
        name: 'signRecord',
        component: () => import('@/views/training/signRecord'),
        meta: { title: '报名详情', icon: '', inlinePage: true, activeMenu: '/training/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/examination',
    component: Layout,
    redirect: '/examination/list',
    name: 'examination',
    meta: { title: '比赛管理', icon: 'el-icon-medal' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/examination/index'),
        meta: { title: '比赛列表', icon: 'el-icon-medal', keepAlive: true }
      },
      {
        path: 'signRecord',
        name: 'signRecord',
        component: () => import('@/views/examination/signRecord'),
        meta: { title: '报名详情', icon: '', inlinePage: true , activeMenu: '/examination/list'},
        hidden: true
      },
      {
        path: 'achievement',
        name: 'achievement',
        component: () => import('@/views/examination/achievement'),
        meta: { title: '查看成绩', icon: '', inlinePage: true , activeMenu: '/examination/list'},
        hidden: true
      }
    ]
  },

  {
    path: '/payRecord',
    component: Layout,
    redirect: '/payRecord/training',
    name: 'payRecord',
    meta: { title: '购买记录', icon: 'el-icon-wallet' },
    children: [
      {
        path: 'training',
        name: 'training',
        component: () => import('@/views/payRecord/training'),
        meta: { title: '课程购买记录', icon: '' }
      },
      {
        path: 'examination',
        name: 'examination',
        component: () => import('@/views/payRecord/examination'),
        meta: { title: '比赛购买记录', icon: '' },
      }
    ]
  },
  
  {
    path: '/income',
    component: Layout,
    redirect: '/income/training',
    name: 'income',
    meta: { title: '财务报表', icon: 'el-icon-data-analysis' },
    children: [
      {
        path: 'all',
        name: 'all',
        component: () => import('@/views/income/all'),
        meta: { title: '财务报表', icon: 'el-icon-data-analysis' }
      },
      // {
      //   path: 'training',
      //   name: 'training',
      //   component: () => import('@/views/income/training'),
      //   meta: { title: '培训收入统计', icon: '' }
      // },
      // {
      //   path: 'examination',
      //   name: 'examination',
      //   component: () => import('@/views/income/examination'),
      //   meta: { title: '比赛收入统计', icon: '' },
      // }
    ]
  },

  
  {
    path: '/record',
    component: Layout,
    redirect: '/record/action',
    name: 'record',
    meta: { title: '访问日志', icon: 'el-icon-document' },
    children: [
      {
        path: 'action',
        name: 'action',
        component: () => import('@/views/record/action'),
        meta: { title: '后台操作日志', icon: '' }
      },
      {
        path: 'share',
        name: 'share',
        component: () => import('@/views/record/share'),
        meta: { title: '用户分享列表', icon: '' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
