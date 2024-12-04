<template>
  <BaseForm
  :model="plan"
  :requiredFields="requiredFields"
  :onSubmit="addPlan"
  button="Adicionar plano de pagamento!"
  errorsHint="adicionar plano de pagamento"
  :inputs="inputs"
  :textareas="textarea"
  />
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { inputs, textarea } from "./PaymentPlanFields";
  import PaymentPlanService from "@/service/PaymentPlanService";
  import BaseForm from "../bases/BaseForm.vue";

  const plan = ref({});

   const emit = defineEmits(['planCreated'])

  const requiredFields = ["name", "value", "numberDaysPerWeek", "billingInterval"];

  const addPlan = async () => {
      await PaymentPlanService.create(plan.value);
      emit('planCreated')
  };
  </script>
  