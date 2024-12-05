<script setup>
import GlobalAlerts from './components/alerts/GlobalAlerts.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <RouterView />
    <GlobalAlerts />
  </div>
</template>
