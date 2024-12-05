<template>
  <BaseForm
  :model="trainee"
  :requiredFields="requiredFields"
  :onSubmit="updateTrainee"
  errorsHint="atualizar aluno"
  :inputs="inputs"
  :selects="select(paymentPlans, formatPlanLabel)"
  :textareas="textarea"
  button="Atualizar Aluno!"
  />
</template>
  
  <script setup>
  import PaymentPlanService from '@/service/PaymentPlanService';
  import TraineeService from '@/service/TraineeService';
  import {inputs, select, textarea} from './TraineeFields.js'
  import { ref, onMounted} from 'vue';
  import BaseForm from '../bases/BaseForm.vue';

  const props = defineProps({
    trainee: {type: Object, required: true}
  })
  
  const paymentPlans = ref([]);
  const requiredFields = ["name", "birthDate", "cpf", "phone", "emergencyContact", "paymentDay", "address", "paymentPlanId"];

  const emits = defineEmits(['updatedTrainee'])
  
  onMounted(async () => {
    paymentPlans.value = await PaymentPlanService.findAll();
    console.log(paymentPlans.value)
  });

  const updateTrainee = async () => {
      await TraineeService.update(props.trainee);
      emits('updatedTrainee')
  };
  
  const formatPlanLabel = (plan) => {
    return `${plan.name} - R$${plan.value}`;
  };
  
  </script>
  