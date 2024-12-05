<template>
    <div class="flex flex-col gap-y-4">
      <p class="my-2 w-full text-lg text-default">
        Você deseja realmente
        {{message}} {{name}}?
      </p>
  
      <div class="flex justify-between">
        <button class="btn bg-primary text-dark text-base font-semibold w-5/12 hover:text-primary" @click="closeModal">
          Cancelar
        </button>
  
        <button class="btn bg-secondary text-dark text-base font-semibold w-5/12 hover:text-primary"
          @click="send">
          {{ buttonMessage }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { addAlert } from '../alerts/useAlerts';
  
  const props = defineProps({
    name: String,
    onSend: Function,
    closeModal: Function,
    message: String,
    buttonMessage: String
  });
  
  const send = async () => {
    try {
      await props.onSend()
      addAlert({
        title: 'Sucesso!',
        message: `Sucesso em ${props.message}`,
        alertType: 'success',
        duration: 3000
      });
    } catch (error) {
      addAlert({
        title: 'Erro!',
        message: error.message,
        alertType: 'error',
        duration: 3000
      });
      console.error("Algo deu errado: " + error.message)
    } finally {
      props.closeModal();
    }
  };
  </script>