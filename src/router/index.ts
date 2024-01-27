// I'm having a problem with the path types so this will fix for now
//@ts-nocheck

import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SigninView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    }
  ]
})

export default router
