<script setup>
import { onMounted, ref } from 'vue'

import { getRecipeList } from '@/api/recipeAPI'

const recipeData = ref([])
const recipeList = ref([])

onMounted(async () => {
  recipeData.value = await getRecipeList(10, 0)
  console.log(recipeData)
  recipeList.value = recipeData.value.recipes
})
</script>

<template>
  <div class="page-header">
    <h1>Rezeptilis</h1>
    <div class="spacer"></div>
    <router-link :to="{ name: 'recipe-new' }">
      <button type="button" class="btn btn-primary">Neues Rezept</button>
    </router-link>
  </div>

  <div class="card mb-2" v-for="recipe in recipeList">
    <div class="card-body">
      <h4 class="card-title">
        {{ recipe.name }}<span class="badge rounded-pill text-bg-primary">{{ recipe.category }}</span>
      </h4>

      <div class="card-text">
        <p>Zutaten</p>
        <ul>
          <li v-for="ingredient in recipe.ingredients">{{ ingredient.name }} {{ ingredient.quantity }}</li>
        </ul>
      </div>
      <div class="add-button">
        <router-link :to="{ name: 'recipe-details', params: { id: recipe.id } }">
          <button type="button" class="btn btn-primary">Details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.add-button {
  display: flex;
  justify-content: flex-end;
}

.badge {
  margin-left: 12px;
}

p {
  margin: 0;
}
</style>
