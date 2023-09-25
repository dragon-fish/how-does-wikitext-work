import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'

import IndexView from '@/views/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/getting-started/01-font-style',
      name: 'getting-started-01-font-style',
      component: () => import('@/views/getting-started/01-font-style.vue'),
    },
    {
      path: '/template/use-template',
      name: 'template-use-template',
      component: () => import('@/views/template/use-template.vue'),
    },
  ],
})

export default router
