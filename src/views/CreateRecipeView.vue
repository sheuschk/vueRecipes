<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { createRecipe } from '@/api/recipeAPI'



const route = useRoute()
const recipe = ref(null)

function saveRecipe() {
  createRecipe(recipe.value)
}

</script>


<template>

  <h1>Create a new Recipe</h1>
  <input placeholder="New recipe">
  <input placeholder="New recipe">

  <button class="btn btn-outline-primary">Save</button>

</div>

<button class="btn btn-outline-primary" @click="editRecipe">{{ edit == false ? 'Edit' : 'Cancel' }}</button>
<button class="btn btn-outline-primary" @click="editRecipe">{{ edit == false ? 'Edit' : 'Cancel' }}</button>

<div class="add-button">
  <router-link :to="{ name: 'home', params: { limit: 10, offset:0 } }">
    <button type="button" @click="saveRecipe" class="btn btn-primary">Save</button>
  </router-link>
</div>

<div class="add-button">
  <router-link :to="{ name: 'home', params: { limit: 10, offset:0 } }">
    <button type="button" class="btn btn-primary">Cancel</button>
  </router-link>
</div>
</template>
<style scoped lng="css"></style>
