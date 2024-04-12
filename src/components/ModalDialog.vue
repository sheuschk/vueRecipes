<script setup>
import { onMounted, ref } from 'vue'
import { computed } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import { Modal } from 'bootstrap'

const emit = defineEmits(['cancel', 'ok'])
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  okTitle: {
    type: String,
    default: 'OK'
  },
  okButtonType: {
    type: String,
    default: 'primary'
  },
  okDisabled: {
    type: Boolean,
    default: false
  },
  cancelDisabled: {
    type: Boolean,
    default: false
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  cancelTitle: {
    type: String,
    default: 'Cancel'
  },
  dismissOnOk: {
    type: Boolean,
    default: false
  },
  dismissOnCancel: {
    type: Boolean,
    default: true
  },
  staticBackdrop: {
    type: Boolean,
    default: false
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: null
  }
})

const modalRef = ref(null)
let modal = null

const show = () => {
  modal.show()
}

const hide = () => {
  modal.hide()
}

const modalClasses = computed(() => {
  const modalClasses = ['modal-dialog']

  if (props.size === 'lg') {
    modalClasses.push('modal-lg')
  } else if (props.size === 'xl') {
    modalClasses.push('modal-xl')
  }
  return modalClasses
})

onMounted(() => {
  modal = new Modal(modalRef.value)
})

onBeforeRouteUpdate(() => {
  hide()
})

onBeforeRouteLeave(() => {
  hide()
})
defineExpose({ show, hide })
</script>

<template>
  <div class="modal fade" tabindex="-1" aria-labelledby="" aria-hidden="true" ref="modalRef" :data-bs-backdrop="staticBackdrop ? 'static' : undefined">
    <div :class="modalClasses">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <h5 class="modal-title">{{ title }}</h5>
          </slot>
          <button
            v-if="showCancel"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="emit('cancel')"
            :disabled="cancelDisabled"
          ></button>
        </div>
        <div class="modal-body">
          <slot>{{ content }}</slot>
        </div>
        <div class="modal-footer" v-if="showFooter">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-outline-primary"
              :data-bs-dismiss="dismissOnCancel ? 'modal' : undefined"
              @click="emit('cancel')"
              v-if="showCancel"
              :disabled="cancelDisabled"
            >
              {{ cancelTitle }}
            </button>
            <button :class="'btn btn-' + okButtonType" :data-bs-dismiss="dismissOnOk ? 'modal' : undefined" @click="emit('ok')" :disabled="okDisabled">
              {{ okTitle }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
