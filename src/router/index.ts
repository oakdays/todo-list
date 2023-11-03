import { createRouter, createWebHistory } from 'vue-router'
import ToDoListView from '@/views/ToDoListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'toDoList',
      component: ToDoListView
    },
    {
      path: '/backlog',
      name: 'backlog',
      component: () => import('@/views/BacklogView.vue')
    }
  ]
})

export default router
