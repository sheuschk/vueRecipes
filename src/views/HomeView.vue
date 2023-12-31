<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import {getRecipeList} from '../api/recipeApi'
import { onMounted, ref } from 'vue';


const recipeList = ref([])

onMounted(async () => {
  recipeList.value =  await getRecipeList(10,0)
})

</script>

<template>
<h1>Recipes</h1>
    <ul>
    <li v-for="recipe in recipeList.recipes">{{ recipe.name }}</li> 
    </ul>
</template>
