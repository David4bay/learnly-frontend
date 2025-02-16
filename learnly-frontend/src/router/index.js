import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import Lessons from '@/views/Lessons.vue'
import Quizes from '@/views/Quizes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
    },
    {
      path: '/lessons',
      name: 'lessons',
      component: Lessons
    },
    {
      path: '/quizes',
      name: 'quizes',
      component: Quizes
    },
  ],
})

export default router
