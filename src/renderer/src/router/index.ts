import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import DefaultLayout from '../layouts/default.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../page/dashboard/index.vue'),
        meta: { title: '仪表盘' }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('../page/teacher-crud/index.vue'),
        meta: { title: '教师管理' }
      },
      {
        path: 'ai-test',
        name: 'AITest',
        component: () => import('../page/ai-test/index.vue'),
        meta: { title: 'AI测试' }
      },
      {
        path: 'api-test',
        name: 'APITest',
        component: () => import('../page/api-test/index.vue'),
        meta: { title: 'API测试' }
      },
      {
        path: 'ipc-test',
        name: 'IPCTest',
        component: () => import('../page/ipc-test/index.vue'),
        meta: { title: 'IPC通信测试' }
      },
      {
        path: 'components-test',
        name: 'ComponentsTest',
        component: () => import('../page/components-test/index.vue'),
        meta: { title: '通用组件展示' }
      },
      {
        path: 'storage-local',
        name: 'StorageLocal',
        component: () => import('../page/storage-test/local/index.vue'),
        meta: { title: '本地存储测试' }
      },
      {
        path: 'storage-cloud',
        name: 'StorageCloud',
        component: () => import('../page/storage-test/cloud/index.vue'),
        meta: { title: '云存储测试' }
      },
      {
        path: 'docker',
        name: 'Docker',
        component: () => import('../page/docker/index.vue'),
        meta: { title: 'Docker能力' }
      },
      {
        path: 'terminal',
        name: 'Terminal',
        component: () => import('../page/terminal/index.vue'),
        meta: { title: '仿终端能力' }
      },
      {
        path: 'big-screen',
        name: 'BigScreen',
        component: () => import('../page/bigScreen/index.vue'),
        meta: { title: '大屏展示' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../page/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../page/register/index.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('../page/forget/index.vue'),
    meta: { title: '忘记密码' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
