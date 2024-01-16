<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { deleteRecipe, getRecipe } from '@/api/recipeAPI'

const route = useRoute()
const recipe = ref(null)
onMounted(async () => {
  if (route.params && route.params.id) {
    recipe.value = await getRecipe(10, 0, route.params.id)
  }
})
</script>
<template><h1>Recipe View</h1></template>
<style scoped lng="css"></style>
