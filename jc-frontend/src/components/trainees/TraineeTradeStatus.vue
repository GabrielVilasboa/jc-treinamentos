<template>
    <div class="flex flex-col gap-y-4">
      <p class="my-2 w-full text-lg text-default">
        Você deseja realmente 
        {{ trainee.isActive ? 'desativar' : 'ativar' }} 
        o aluno {{ trainee.name }}?
      </p>
  
      <div class="flex justify-between">
        <button
          class="btn bg-primary text-dark text-base font-semibold w-5/12 hover:text-primary"
          @click="closeModal"
        >
          Cancelar
        </button>
  
        <button
          class="btn bg-secondary text-dark text-base font-semibold w-5/12 hover:text-primary"
          @click="confirmStatusChange"
        >
          {{ trainee.isActive ? 'Desativar' : 'Ativar' }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>

  import TraineeService from '@/service/TraineeService';

  const props = defineProps({
    trainee: Object,
    closeModal: Function,
  });
  
  const confirmStatusChange = async () => {
    try {
      console.log(props.trainee.id)
      await TraineeService.tradeStatus(props.trainee.id);
      alertMessage.value = `${props.trainee.name} foi ${props.trainee.isActive ? 'desativado' : 'ativado'} com sucesso!`;
      alertTitle.value = 'Sucesso!';
      alertType.value = 'success';
    } catch (error) {
        console.error("Algo deu errado:")
    } finally {
      props.closeModal();
    }
  };
  </script>
  