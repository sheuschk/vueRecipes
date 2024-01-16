import { createRouter, createWebHistory } from 'vue-router'
import RecipeListView from '@/views/RecipeListView.vue'
import RecipeView from '@/views/RecipeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RecipeListView
    },
    {
      path: '/:id',
      name: 'recipe-details',
      component: RecipeView,
    },
    {
      path: '/:id/edit',
      name: 'recipe-edit',
      component: RecipeView
    },
    {
      path: '/new',
      name: 'recipe-new',
      component: RecipeView
    }
  ]
})

export default router
