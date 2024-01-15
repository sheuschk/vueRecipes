<script setup>
import { onMounted, ref } from 'vue'

import { getRecipeList } from '@/api/recipeAPI'

const recipeData = ref([])
const recipeList = ref([])

onMounted(async () => {
  recipeData.value = await getRecipeList(10, 0)
  recipeList.value = recipeData.value.recipes
})
</script>

<template>
  <div class="row">
    <h1>Rezeptilis</h1>
    <button class="btn btn-outline-primary">Neues Rezept</button>
  </div>

  <div class="card" v-for="recipe in recipeList">
    <div class="card-body">
      <h4 class="card-title">{{ recipe.name }}</h4>
      <p class="card-text">Kategorie: {{ recipe.category }}</p>
      <div class="card-text">
        <p>Zutaten</p>
        <ul>
          <li v-for="ingredient in recipe.ingredients">{{ ingredient.name }} {{ ingredient.quantity }}</li>
        </ul>
      </div>
      <button class="btn btn-outline-primary">Details</button>
    </div>
  </div>
</template>
<style lang="css" scoped>
.row {
  display: flex;
}
</style>
