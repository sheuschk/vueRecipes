<script setup>
import { computed, onMounted } from 'vue'
import AlertCircle from 'vue-material-design-icons/AlertCircle.vue'
import BullhornOutline from 'vue-material-design-icons/BullhornOutline.vue'
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue'
import CloseCircle from 'vue-material-design-icons/CloseCircle.vue'
import Information from 'vue-material-design-icons/Information.vue'

import { nanoid } from 'nanoid'

const emit = defineEmits(['close'])
const timeVisible = 8000
const id = nanoid()

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: new Date()
  },
  color: {
    type: String,
    default: null
  },
  stack: {
    type: String,
    default: ''
  }
})

const borderLeft = computed(() => {
  const b = { borderLeftWidth: '10px', borderLeftStyle: 'solid', borderLeftColor: props.color }
  if (props.type === 'warning') b.borderLeftColor = 'var(--bs-warning)'
  else if (props.type === 'error') b.borderLeftColor = 'var(--bs-danger)'
  else if (props.type === 'success') b.borderLeftColor = 'var(--bs-success)'
  else if (props.type === 'info') b.borderLeftColor = 'var(--bs-info)'
  return b
})

const iconColor = computed(() => {
  return { color: props.color }
})

onMounted(() => {
  if (props.type === 'success' || props.type === 'warning') {
    setTimeout(() => {
      emit('close')
    }, timeVisible)
  }
})

const copyToClipboard = async () => {
  const copyText = `${props.text}\n\n${props.stack}`
  await navigator.clipboard.writeText(copyText)
}
</script>

<template>
  <div class="toast show mt-2" :style="borderLeft" role="alert" aria-live="assertive" aria-atomic="true">
    <div v-if="type" class="toast-icon-wrapper">
      <CheckCircle v-if="type === 'success'" class="toast-icon text-success" />
      <CloseCircle v-if="type === 'error'" class="toast-icon text-danger" />
      <AlertCircle v-if="type === 'warning'" class="toast-icon text-warning" />
      <Information v-if="type === 'info'" class="toast-icon text-info" />
      <BullhornOutline v-if="type === 'admin'" class="toast-icon" :style="iconColor" />
    </div>

    <div :class="[{ 'with-icon': type, 'no-icon': !type }]">
      <div class="toast-header">
        <strong class="me-auto">{{ title }}</strong>
        <button type="button" class="btn-close" @click="emit('close')" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        <div>{{ text }}</div>
        <p v-if="type === 'error' && stack !== '' && stack !== null" class="d-inline-flex gap-1">
          <a data-bs-toggle="collapse" :href="`#${id}`" role="button" aria-expanded="false" :aria-controls="id"> Details </a>
        </p>
        <div class="collapse" :id="id">
          <div class="card card-body">
            <div id="error-details">
              <code class="text-danger">
                {{ text }}
                <br />
                <br />
                {{ stack }}
              </code>
            </div>
            <button type="button" class="btn btn-outline-primary btn-sm" @click="copyToClipboard">Kopieren</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  flex-direction: row;
  background: var(--bs-body-bg);
}
.toast-header {
  padding-left: 2px;
}
.toast-body {
  padding-left: 2px;
  max-height: 90vh;
  overflow-y: scroll;
}
.toast-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
}
.toast-icon {
  font-size: 2.4rem;
  bottom: 0.125em;
}

.with-icon {
  flex: 1;
  overflow: hidden;
}

.no-icon {
  width: 100%;
  padding-left: 0.5rem;
}

.btn-sm {
  margin-top: 8px;
}
</style>
