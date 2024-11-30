<template>
    <div 
      v-if="visible" 
      class="alert alert-info shadow-lg fixed top-4 right-4 z-50 max-w-96"
      :class="alertTypeClass"
      role="alert">
      <div>
        <span class="font-bold">{{ title }}</span>
        <p>{{ message }}</p>
      </div>
      <button @click="closeAlert" class="btn btn-sm btn-circle absolute top-2 right-2">
        ×
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed} from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    alertType: {
      type: String,
      default: 'info' 
    },
    duration: {
      type: Number,
      default: 3000 
    }
  });
  
  const visible = ref(true);
  
  const alertTypeClass = computed(() => {
    switch (props.alertType) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      default:
        return 'alert-info';
    }
  });
  
  const closeAlert = () => {
    visible.value = false;
  };
  
  onMounted(() => {
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  });
  </script>
  
  <style scoped>
  .alert {
    transition: opacity 0.5s ease-in-out;
  }
  </style>