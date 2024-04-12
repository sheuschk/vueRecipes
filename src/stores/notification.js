import { ref } from 'vue'

import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notificationStore', () => {
  const notifications = ref([])

  /**
   * Adds a notification.
   *
   * @param {Object} notification - The notification.
   * @param {string} notification.type - The notification type.
   * @param {string} notification.message - The notification message.
   * @param {string} notification.name - The notification name.
   * @param {string} notification.color - The notification color.
   * @param {string} notification.stack - The stack of an error notification.
   */
  const addNotification = ({ type, message, name, color = null, stack = null } = {}) => {
    notifications.value.push({ id: nanoid(), type, date: new Date(), text: message, title: name, color: color, stack: stack })
  }

  /**
   * Adds an error notification.
   *
   * @param {Error} error - The error.
   */
  const addError = (error) => {
    if (error.cause && error.cause.stack) {
      addNotification({ type: 'error', message: error.message, name: error.name ? error.name : 'Error', stack: error.cause.stack })
    } else {
      addNotification({ type: 'error', message: error.message, name: error.name ? error.name : 'Error', stack: error.stack })
    }
  }

  /**
   * Adds a warning notification.
   *
   * @param {Object} warning - The warning notification.
   * @param {string} warning.message - The warning message.
   * @param {string} [warning.name=Warning] - The warning name.
   */
  const addWarning = ({ message, name = 'Warning' } = {}) => {
    addNotification({ type: 'warning', message, name })
  }

  /**
   * Adds a success notification.
   *
   * @param {Object} success - The success notification.
   * @param {string} success.message - The success message.
   * @param {string} [success.name=Success] - The success name.
   */
  const addSuccess = ({ message, name = 'Success' } = {}) => {
    addNotification({ type: 'success', message, name })
  }

  /**
   * Adds a info notification.
   *
   * @param {Object} info - The info notification.
   * @param {string} info.message - The info message.
   * @param {string} [info.name=Info] - The info name.
   */
  const addInfo = ({ message, name = 'Info' } = {}) => {
    addNotification({ type: 'info', message, name })
  }

  /**
   * Adds a info notification.
   *
   * @param {Object} info - The info notification.
   * @param {string} info.message - The info message.
   * @param {string} info.color - The info color.
   * @param {string} [info.name=Info] - The info name.
   */
  const addManualAdminNotification = ({ message, name = 'A message from your admin', color } = {}) => {
    addNotification({ type: 'admin', message, name, color })
  }

  /**
   * Removes the given notification.
   *
   * @param {Object} notification - The notification that shall be removed.
   * @param {string} notification.id - The notification id.
   */
  const removeNotification = ({ id } = {}) => {
    notifications.value = notifications.value.filter((notification) => notification.id !== id)
  }

  return { notifications, addNotification, addError, addWarning, addSuccess, addInfo, addManualAdminNotification, removeNotification }
})