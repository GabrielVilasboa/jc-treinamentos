<template>
  <div class="flex flex-col gap-y-4">
    <div v-if="alert" role="alert" class="alert alert-warning w-max py-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span class="font-bold text-xl">{{alert}}</span>
    </div>
    <p class="mb-2 text-lg text-default">
      Você deseja realmente
      {{ message }} {{ name }}?
    </p>

    <div class="flex justify-between">
      <button class="btn bg-primary text-dark text-base font-semibold w-5/12 hover:text-primary" @click="closeModal">
        Cancelar
      </button>

      <button class="btn bg-secondary text-dark text-base font-semibold w-5/12 hover:text-primary" @click="send">
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
  buttonMessage: String,
  alert: String
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