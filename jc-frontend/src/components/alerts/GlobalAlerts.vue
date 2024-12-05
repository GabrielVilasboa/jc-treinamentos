<template>
  <div class="fixed top-4 right-4 z-[9999] space-y-4 w-96">
    <div 
      v-for="alert in alerts" 
      :key="alert.id" 
      class="alert shadow-lg max-w-96"
      :class="alertTypeClass(alert.alertType)">
      <div>
        <span class="font-bold">{{ alert.title }}</span>
        <p>{{ alert.message }}</p>
      </div>
      <button 
        @click="closeAlert(alert.id)" 
        class="btn btn-sm btn-circle absolute top-2 right-2">
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAlerts, closeAlert } from './useAlerts';

const { alerts } = useAlerts();

const alertTypeClass = (type) => {
  switch (type) {
    case 'success':
      return 'alert-success';
    case 'error':
      return 'alert-error';
    case 'warning':
      return 'alert-warning';
    default:
      return 'alert-info';
  }
};
</script>
