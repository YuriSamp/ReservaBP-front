import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/sign-in.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/sign-up.vue')
    },
    {
      path: '/scheduling',
      name: 'scheduling',
      component: () => import('../views/scheduling.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profile.vue')
    }
  ]
})

export default router
