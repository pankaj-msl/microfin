import { createRouter, createWebHistory } from 'vue-router'
import ExpenseView from '@/views/ExpenseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'expense',
      component: ExpenseView
    },
  ]
})

export default router
