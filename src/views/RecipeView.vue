<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import { deleteRecipe, getRecipe } from '@/api/recipeAPI'



const route = useRoute()
const recipe = ref(null)
const edit = ref(false)


const name = ref(null)
const ingredients = ref(null)
const description = ref(null)
const category = ref(null)

onMounted(async () => {
  if (route.params.id) {
    recipe.value = await getRecipe(route.params.id)

    name.value = recipe.value.name
    ingredients.value = recipe.value.ingredients
    description.value = recipe.value.description
    category.value = recipe.value.category
  }
})

function editRecipe() {
  if (edit.value == false) {
    edit.value = true
  } else {
    edit.value = false
  }
}

function delRecipe() {
  deleteRecipe(recipe.value.id)
}
    
</script>
<template>
<div v-if="edit == false">
  <h1>{{name}}</h1>
  <p>{{ category }}</p>
  <p>{{description}}</p>
  <div v-for="ingredient in ingredients">
    <p>{{ingredient.name}} {{ingredient.quantity}}</p>
  </div>
</div>

<div v-if="edit == true">
  <h2><input v-bind:value="name"></h2>
  <button class="btn btn-outline-primary">Save</button>

</div>

<button class="btn btn-outline-primary" @click="editRecipe">{{ edit == false ? 'Edit' : 'Cancel' }}</button>


<div class="add-button">
  <router-link :to="{ name: 'home', params: { limit: 10, offset:0 } }">
    <button type="button" class="btn btn-primary">Back</button>
  </router-link>
</div>
<div class="delete-button">
  <router-link :to="{ name: 'home', params: { limit: 10, offset:0 } }">
    <button type="button" @click="delRecipe" class="btn btn-primary">Delete</button>
  </router-link>
</div>
</template>
<style scoped lng="css"></style>
