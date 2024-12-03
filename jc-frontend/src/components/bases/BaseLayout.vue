<script setup>
import Sidebar from '../layout/Sidebar.vue';
import Navbar from '../layout/Navbar.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen max-lg:w-screen w-max pl-12 pt-12 box-border">
    <Sidebar />
    <Navbar />
    <div class="pt-4 px-4 max-w-6xl">
      <slot></slot>
    </div>
  </div>
</template>