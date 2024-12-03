<template>
    <form @submit.prevent class="flex flex-wrap gap-2">
      <BaseInput 
        v-model="plan.name" 
        id="name" 
        label="Nome Do Plano" 
        placeholder="Nome Do Plano" 
        format="name" 
        :error="errors.name"
      />
      <BaseInput 
        v-model="plan.value" 
        type="number" 
        id="value" 
        label="Valor" 
        placeholder="Valor" 
        :step="0.01" 
        :error="errors.value"
      />
      <BaseInput 
        v-model="plan.numberDaysPerWeek" 
        type="number" 
        id="frequency" 
        label="Frequência Semanal"
        placeholder="Frequência Semanal" 
        :error="errors.numberDaysPerWeek"
      />
      <BaseInput 
        v-model="plan.billingInterval" 
        type="number" 
        id="paymentFrequency"
        label="Frequência de Pagamento" 
        placeholder="Frequência de Pagamento" 
        :error="errors.billingInterval"
      />
      <BaseTextarea v-model="plan.description" id="description" label="Descrição" :rows="3" />
      <button 
        @click="updatePlan" 

        class="btn btn-primary w-full py-2 mt-4 text-white font-bold transition-shadow duration-300 hover:shadow-lg active:shadow-sm">
        Atualizar Plano!
      </button>

      <BaseAlert 
        v-if="alert.show" 
        :title="alert.title" 
        :message="alert.message" 
        :alertType="alert.type" 
      />

    </form>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import BaseInput from "../bases/BaseInput.vue";
  import BaseAlert from "../bases/BaseAlert.vue";
  import PaymentPlanService from "@/service/PaymentPlanService";
  import BaseTextarea from "../bases/BaseTextarea.vue";

  const alert = ref({});

  const errors = ref({});

  const props = defineProps({
    plan: {type: Object, required: true},
  })

  const emit = defineEmits(['planUpdated'])

  const requiredFields = ["name", "value", "numberDaysPerWeek", "billingInterval"];

  const updatePlan = async () => {
    try {
      clearErrors();
      requiredFields.forEach((field) => {
        if (!props.plan[field]) {
          errors.value[field] = "Por favor, insira um valor neste campo.";
        }
      });
  
      if (Object.keys(errors.value).length > 0) {
        console.warn("Campos obrigatórios faltando", errors.value);
        return;
      }
      console.log('aqui chegou')
      await PaymentPlanService.update(formatPlan(props.plan));
      
      console.log("Plano atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      showAlert(
        "Algo deu errado.",
        error.response?.data?.message || "Erro ao adicionar plano.",
        "error"
      );
    }
  };
  
  const formatPlan = (paymentPlan) => {
  return {
    id: paymentPlan.id,
    name: paymentPlan.name,
    value: parseFloat(paymentPlan.value),
    numberDaysPerWeek: paymentPlan.numberDaysPerWeek,
    billingInterval: paymentPlan.billingInterval,
    description: paymentPlan.description
  }
}

  const clearErrors = () => {
    errors.value = {};
  };
  

  const showAlert = (title, message, type) => {
    alert.value = { title, message, type, show: true };
    setTimeout(() => {
      alert.value = {};
    }, 3000);
  };
  </script>
  