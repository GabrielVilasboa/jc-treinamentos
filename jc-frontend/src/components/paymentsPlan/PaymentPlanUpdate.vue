<template>
  <BaseForm
    :model="plan"
    :requiredFields="requiredFields"
    :onSubmit="updatePlan"
    button="Adicionar plano de pagamento!"
    errorsHint="adicionar plano de pagamento"
    :inputs="inputs"
    :textareas="textarea"
  />
</template>
  
  <script setup>

  import PaymentPlanService from "@/service/PaymentPlanService";
  import BaseForm from "../bases/BaseForm.vue";
  import {inputs, textarea} from "./PaymentPlanFields"

  const props = defineProps({
    plan: {type: Object, required: true},
  })

  const emit = defineEmits(['planUpdated'])

  const requiredFields = ["name", "value", "numberDaysPerWeek", "billingInterval"];

  const updatePlan = async () => {
    await PaymentPlanService.update(formatPlan(props.plan));
    emit("planUpdated")
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
  </script>
  
  
