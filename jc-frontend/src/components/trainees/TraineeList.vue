<template>
    <ul class="list">
      <li
        v-for="(trainee, index) in trainees"
        :key="index"
        class="bg-zinc-950 list-none font-sans px-8 py-2 rounded border border-secondary mb-2 text-primary"
      >
        <BaseAccordion
          :title="trainee.name"
          :extraButton="ableEdit ? '/src/assets/icons/edit.png': null"
          :extraFunction="ableEdit ? () => sendSelected(trainee, 'edit') : null"
          width=""
          :icon-function="ableEdit ? () => sendSelected(trainee, 'disabled') : null"
          :icon="trainee.isActive ? 
            '/src/assets/icons/actived.png' : 
            '/src/assets/icons/inactive.png'"
        >
          <div class="flex justify-between">
            <div class="flex flex-col gap-y-0.5">
              <p>Idade: {{ trainee.age }}</p>
              <p>Data de Aniversário: {{ formatDate(trainee.birthDate) }}</p>
              <p>CPF: {{ formatCPF(trainee.cpf) }}</p>
              <p>Data de pagamento: {{ trainee.paymentDay }}</p>
              <p>Endereço: {{ trainee.address }}</p>
            </div>
            <div class="flex flex-col gap-y-0.5">
              <p>Valor do Pagamento: {{ trainee.PaymentPlan.value.toFixed(2).replace('.', ',') }} R$</p>
              <p>Telefone: {{ trainee.phone }}</p>
              <p>Contato de Emergência: {{ trainee.emergencyContact }}</p>
              <p>Frequência: {{ trainee.PaymentPlan.numberDaysPerWeek }} dias p/ semana</p>
            </div>
          </div>
          <BaseTextarea
            v-if="trainee.observations"
            class="my-4"
            id="textArea"
            :modelValue="trainee.observations"
            label="Observações:"
            :rows="3"
            :disabled="true"
          />
          <div class="divider"></div>
          <WeekComponent :traineeSessions="trainee.TraineeSessionConfigs" />
        </BaseAccordion>
      </li>
    </ul>
  

  </template>
  

  <script setup>
  import { formatCPF } from '../../utils/formatCpf';
  import { formatDate } from '../../utils/dateUtils';
  import WeekComponent from '../../components/schedule/WeekComponent.vue';
  import BaseAccordion from '@/components/bases/BaseAccordion.vue';
  import BaseTextarea from '../bases/BaseTextarea.vue';
  
  const props = defineProps({
    trainees: {
      type: Array,
      required: true,
    },
    ableEdit: {
        type:Boolean,
         default:false
    },
  });

  const emit = defineEmits(['sendSelectedTrainee'])

  const sendSelected = (trainee, method = '') =>{
    emit('sendSelectedTrainee', formatTraineeSelected(trainee), method)
  }

  const formatTraineeSelected = (trainee) => {
    return {
      id: trainee.id,
      name: trainee.name,
      birthDate: formatDate(trainee.birthDate, 'yyyy-MM-dd'),
      cpf: trainee.cpf,
      phone: trainee.phone,
      emergencyContact: trainee.emergencyContact,
      paymentDay: trainee.paymentDay,
      address: trainee.address,
      isActive: trainee.isActive,
      paymentPlanId: trainee.paymentPlanId
    }
  }

  </script>