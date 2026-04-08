import { createRouter, createWebHistory } from 'vue-router'
// 路由配置
const routes = []
// 创建路由实例
const router = createRouter({
  // WebHistory路由模式
  history: createWebHistory(),
  routes
})
// 导出路由实例
export default router
