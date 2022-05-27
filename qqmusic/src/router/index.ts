import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/Home/Home.vue'),
    children: [
      {
        path: '/recommend/:id',
        component: () => import('../views/Home/HomeDetails.vue')
      },
    ]
  },
  {
    path: '/singer',
    component: () => import('../views/Singer/Singer.vue'),
    children: [
      {
        path: '/singer/:id',
        component: () => import('../views/Singer/SingerDetails.vue')
      },
    ]
  },
  {
    path: '/rank',
    component: () => import('../views/Rank/Rank.vue')
  },
  {
    path: '/search',
    component: () => import('../views/Search/Search.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
