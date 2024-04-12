<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Multiselect from '@vueform/multiselect'

import { deleteRecipe, getRecipe } from '@/api/recipeAPI'

import { useNotificationStore } from '@/stores/notification'

const route = useRoute()
const router = useRouter()
const notificationStore = useNotificationStore()

const loading = ref(false)

const mode = ref('details')

const recipe = ref({
  id: null,
  name: null,
  category: null,
  ingredients: []
})

const categories = ref(['Suppe', 'Reis', 'Dessert', 'Salat', 'Nudeln'])

const formControlCSSClass = computed(() => {
  if (mode.value === 'edit' || mode.value === 'new') {
    return 'form-control'
  } else {
    return 'form-control-plaintext'
  }
})

const readonlyCSSClass = computed(() => {
  return mode.value !== 'edit' && mode.value !== 'new'
})

const cancelEditing = () => {
  if (mode.value === 'new') {
    router.push({ name: 'home' })
  } else {
    router.push({ name: 'recipe-details', params: { id: route.params.id } })
  }
}

const editRecipe = () => {
  router.push({ name: 'recipe-edit', params: { id: route.params.id } })
}

const deleteRec = async () => {
  await deleteRecipe(recipe.value.id)
  notificationStore.addSuccess({ name: 'Nachricht', message: 'Rezept wurde erfolgreich gelöscht.' })
  router.push({ name: 'home' })
}

onMounted(async () => {
  loading.value = true
  if (route.params && route.params.id) {
    const result = await getRecipe(route.params.id)
    recipe.value.id = result.id
    recipe.value.name = result.name
    recipe.value.category = result.category
    recipe.value.ingredients = result.ingredients
  }
  if (route.fullPath.includes('new')) {
    mode.value = 'new'
    recipe.value = {
      id: null,
      name: null,
      category: null,
      ingredients: []
    }
  } else if (route.fullPath.includes('edit')) {
    mode.value = 'edit'
  }
  loading.value = false
})
</script>
<template>
  <div v-if="!loading">
    <div class="page-header">
      <h5 v-if="mode === 'new'">Rezept hinzufügen</h5>
      <h5 v-if="mode === 'edit'">Rezept bearbeiten</h5>
      <h5 v-if="mode === 'details'">Rezeptdetails</h5>
      <div class="spacer"></div>

      <button v-if="mode === 'details'" class="btn btn-outline-primary" @click="editRecipe">Rezept bearbeiten</button>
    </div>
    <div class="page-body">
      <form @submit.prevent="onSubmit" autocomplete="off">
        <fieldset>
          <div class="mb-3 row">
            <label for="title" class="col-md-3 col-form-label">Name</label>
            <div class="col-md-9">
              <input :readonly="readonlyCSSClass" type="text" :class="formControlCSSClass" v-model="recipe.name" />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="title" class="col-md-3 col-form-label">Kategorie</label>
            <div class="col-md-9">
              <Multiselect v-if="mode === 'new' || mode === 'edit'" label="name" valueProp="name" :options="categories" v-model="recipe.category" />
              <input v-else :readonly="readonlyCSSClass" type="text" :class="formControlCSSClass" v-model="recipe.category" />
            </div>
          </div>
          Zutaten
          <div class="mb-3 row" v-for="ingredient in recipe.ingredients">
            <label for="title" class="col-md-3 col-form-label">{{ ingredient.name }}</label>
            <label for="title" class="col-md-9 col-form-label">{{ ingredient.quantity }}</label>
          </div>
        </fieldset>
      </form>
    </div>
    <div class="page-footer">
      <div class="spacer"></div>
      <!-- Button trigger modal -->
      <button v-if="mode === 'details'" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Rezept löschen
      </button>
      <div v-else>
        <button type="button" class="btn btn-outline-primary" @click="cancelEditing">Abbrechen</button>
        <button type="button" class="btn btn-outline-primary">Speichern</button>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Rezept löschen</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">Rezept wirklich unwideruflich löschen?</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Nein</button>
              <button type="button" class="btn btn-danger" @click="deleteRec">Ja</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="css"></style>
