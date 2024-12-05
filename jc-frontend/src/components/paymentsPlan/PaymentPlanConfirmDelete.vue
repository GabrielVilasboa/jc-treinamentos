<template>
    <div class="flex flex-col gap-y-4">
      <p class="my-2 w-full text-lg text-default">
        Você deseja realmente
        desativar o plano {{ paymentPlan.name }}?
      </p>
  
      <div class="flex justify-between">
        <button class="btn bg-primary text-dark text-base font-semibold w-5/12 hover:text-primary" @click="closeModal">
          Cancelar
        </button>
  
        <button class="btn bg-secondary text-dark text-base font-semibold w-5/12 hover:text-primary"
          @click="confirmStatusChange">
          Deletar Plano de Pagamento
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  
  import PaymentPlanService from '@/service/PaymentPlanService';
  import { addAlert } from '../alerts/useAlerts';
  
  const props = defineProps({
    paymentPlan: Object,
    closeModal: Function,
  });
  
  const confirmStatusChange = async () => {
    try {
      await PaymentPlanService(props.paymentPlan.id);
      addAlert({
        title: 'Sucesso!',
        message: `Sucesso em deletar plano de pagamento`,
        alertType: 'success',
        duration: 3000
      });
    } catch (error) {
      addAlert({
        title: 'Erro!',
        message: `Ouve um erro ao plano de pagamento`,
        alertType: 'error',
        duration: 3000
      });
      console.error("Algo deu errado: " + error.message)
    } finally {
      props.closeModal();
    }
  };
  </script>