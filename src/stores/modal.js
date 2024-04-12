import { ref } from 'vue'

import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const modal = ref(null)

  const addConfirmationModal = ({ title, content, okButtonType, okTitle, cancelTitle, staticBackdrop } = {}) => {
    return new Promise((resolve) => {
      modal.value = {
        title,
        content,
        okButtonType,
        okTitle,
        cancelTitle,
        staticBackdrop,
        resolve
      }
    })
  }

  return { modal, addConfirmationModal }
})
