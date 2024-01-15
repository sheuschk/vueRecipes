import { createRouter, createWebHistory } from 'vue-router'
import RecipeListView from '../views/RecipeListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RecipeListView
    }
    
  ]
})

export default router
