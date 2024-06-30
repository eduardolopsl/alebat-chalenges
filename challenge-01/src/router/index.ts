import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ItemView from '@/views/ItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { path: '/items' },
    },
    {
      path: '/items',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/items/:itemId',
      name: 'details',
      component: ItemView,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { path: '/items' },
    },
  ],
})

export default router
