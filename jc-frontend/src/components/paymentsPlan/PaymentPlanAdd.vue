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
        @click="addPlan" 

        class="btn btn-primary w-full py-2 mt-4 text-white font-bold transition-shadow duration-300 hover:shadow-lg active:shadow-sm">
        Adicionar Plano!
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
  
  // Estado do alerta
  const alert = ref({});
  
  // Estado de erros
  const errors = ref({});
  
  // Estado do plano
  const plan = ref({
    name: "",
    value: null,
    numberDaysPerWeek: null,
    billingInterval: 1,
    description: null,
  });
  

  const requiredFields = ["name", "value", "numberDaysPerWeek", "billingInterval"];
  

  const addPlan = async () => {
    try {
      clearErrors();
      requiredFields.forEach((field) => {
        if (!plan.value[field]) {
          errors.value[field] = "Por favor, insira um valor neste campo.";
        }
      });
  
      if (Object.keys(errors.value).length > 0) {
        console.warn("Campos obrigatórios faltando", errors.value);
        return;
      }

      await PaymentPlanService.create(plan.value);
      console.log("Plano adicionado com sucesso!");
  
      clearFields();
      showAlert("Sucesso!", "Plano adicionado com sucesso!", "success");
    } catch (error) {
      console.error(error);
      showAlert(
        "Algo deu errado.",
        error.response?.data?.message || "Erro ao adicionar plano.",
        "error"
      );
    }
  };
  

  const clearFields = () => {
    plan.value = {
      name: "",
      value: null,
      numberDaysPerWeek: null,
      billingInterval: 1,
      description: "",
    };
  };

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
  