<script setup>
import { nextTick, ref, watch } from 'vue'

import { storeToRefs } from 'pinia'

import ModalDialog from '@/components/ModalDialog.vue'

import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()
const { modal } = storeToRefs(modalStore)

const modalRef = ref(null)

watch(modal, async () => {
  if (modal.value != null) {
    await nextTick()
    modalRef.value.show()
  }
})
</script>

<template>
  <ModalDialog
    v-if="modal"
    ref="modalRef"
    :staticBackdrop="modal.staticBackdrop"
    :title="modal.title"
    :content="modal.content"
    :okButtonType="modal.okButtonType"
    :okTitle="modal.okTitle"
    :cancelTitle="modal.cancelTitle"
    :dismissOnOk="true"
    @ok="modal.resolve(true)"
    @cancel="modal.resolve(false)"
  />
</template>
