<template>
  <div class="h-screen flex flex-col justify-center">
    <div class="login flex flex-col items-center justify-center w-96 border-2 p-6 rounded-lg">
      <h1 class="text-4xl font-extrabold text-zinc-50 mb-8 text-center">
        Login
      </h1>
      <LoginForm />
    </div>
  </div>
</template>
<script setup>
  import LoginForm from '../components/auth/LoginForm.vue';
  
</script>
