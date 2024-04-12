<script setup>
import { storeToRefs } from 'pinia'

import ToastComponent from '@/components/ToastComponent.vue'

import { useNotificationStore } from '@/stores/notification.js'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)
</script>

<template>
  <div class="notifications" v-if="notifications != null">
    <TransitionGroup name="list" tag="div">
      <ToastComponent
        v-for="notification in notifications"
        @close="notificationStore.removeNotification(notification)"
        class="m-3"
        :key="notification.id"
        :title="notification.title"
        :text="notification.text"
        :type="notification.type"
        :date="notification.date"
        :color="notification.color"
        :stack="notification.stack"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notifications {
  z-index: 9000;
  position: fixed;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
</style>
