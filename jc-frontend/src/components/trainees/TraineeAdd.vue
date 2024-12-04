<template>
  <BaseForm
  :model="trainee"
  :requiredFields="requiredFields"
  :onSubmit="addTrainee"
  errorsHint="adicionar aluno"
  :inputs="inputs"
  :selects="select(paymentPlans, formatPlanLabel)"
  :textareas="textarea"
  button="Adicionar Aluno!"
  />
</template>

<script setup>
import PaymentPlanService from '@/service/PaymentPlanService';
import TraineeService from '@/service/TraineeService';
import {inputs, select, textarea} from './TraineeFields.js'
import { ref, onMounted } from 'vue';
import BaseForm from '../bases/BaseForm.vue';

const paymentPlans = ref([]);
const trainee = ref({});

const requiredFields = ["name", "birthDate", "cpf", "phone", "emergencyContact", "paymentDay", "address", "paymentPlanId"];

onMounted(async () => {
  paymentPlans.value = await PaymentPlanService.findAll();
});

const addTrainee = async () => {
    await TraineeService.create(trainee.value);
};

const formatPlanLabel = (plan) => {
  return `${plan.name} - R$${plan.value}`;
};

</script>
