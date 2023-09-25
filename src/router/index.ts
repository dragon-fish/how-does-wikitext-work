import { createRouter, createWebHashHistory } from 'vue-router'

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
      name: 'font-style',
      component: () => import('@/views/getting-started/01-font-style.vue'),
    },
    {
      path: '/getting-started/02-line-break',
      name: 'line-break',
      component: () => import('@/views/getting-started/02-line-break.vue'),
    },
    {
      path: '/template/use-template',
      name: 'use-simple-template',
      component: () => import('@/views/template/use-template.vue'),
    },
  ],
})

export default router
