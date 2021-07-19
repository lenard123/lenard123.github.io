import { createRouter, createWebHashHistory } from 'vue-router'

import userRoutes from './user/index.js'
import adminRoutes from './admin/index.js'
import NotFound from '@/pages/404.vue'

const routes = [
  ...userRoutes, 
  ...adminRoutes,
  { path: "/:catchAll(.*)", component: NotFound }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router