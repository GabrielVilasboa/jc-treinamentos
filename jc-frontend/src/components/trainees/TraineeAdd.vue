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
import { ref, onMounted } from 'vue';
import {inputs, select, textarea} from './TraineeFields.js'
import PaymentPlanService from '@/service/PaymentPlanService';
import TraineeService from '@/service/TraineeService';
import BaseForm from '../bases/BaseForm.vue';


const paymentPlans = ref([]);
const trainee = ref({});

const requiredFields = ["name", "birthDate", "cpf", "phone", "emergencyContact", "paymentDay", "address", "paymentPlanId"];

const emits = defineEmits(['addTrainee'])

onMounted(async () => {
  paymentPlans.value = await PaymentPlanService.findAll();
});

const addTrainee = async () => {
    await TraineeService.create(trainee.value);
    trainee.value = {}
    emits('addTrainee')
};

const formatPlanLabel = (plan) => {
  return `${plan.name} - R$${plan.value}`;
};

</script>
