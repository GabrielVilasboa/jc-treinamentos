<template>
    <div class="flex flex-wrap justify-around gap-y-4">
      <BaseCard
        v-for="(paymentPlan, index) in paymentsPlan"
        :key="index"
        class="flex-auto flex-col min-w-52 max-w-[calc(50%-1rem)] max-md:h-min"
      >
        <div class="flex justify-between border-b-2 border-secondary m-2">
            <p class="text-xl font-bold  ">{{ paymentPlan.name }} </p>
            <img 
            src="../../assets/icons/edit.png" 
            class="h-5 mr-4 self-center cursor-pointer" 
            @click="() => sendSelected(paymentPlan)"
        />
        </div>
        <p class="px-2">Valor: R$ {{ formatValueForReal(paymentPlan.value)}}</p>
        <p class="px-2">Frequência Semanal: {{ paymentPlan.numberDaysPerWeek }}</p>
        <p class="px-2">
            Frequência de pagamento: a cada
            {{ paymentPlan.billingInterval }} 
            {{paymentPlan.billingInterval == 1 ? 'mês' : 'meses'}}.
        </p>
        <p class="px-2 mb-2">Alunos no Plano: {{ paymentPlan.traineeCount}} {{ paymentPlan.traineeCount == 1? 'aluno' : 'alunos'}}</p>
        <BaseTextarea  id="description" :rows="3" padding="p-2" :modelValue="paymentPlan.description ? paymentPlan.description : 'Plano sem descrição!'"  :disabled="true"/>
        
      </BaseCard>
    </div>
  </template>

<script setup>
import BaseCard from '../bases/BaseCard.vue';
import BaseTextarea from '../bases/BaseTextarea.vue';

const props = defineProps({
    paymentsPlan: Array,
})

const emit = defineEmits(['sendSelected'])


const sendSelected = (paymentPlan, method = '') =>{
  emit('sendSelected', formatPlan(paymentPlan), method)
}

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

const formatValueForReal = (value) =>
{
  return parseFloat(value).toFixed(2).replace('.', ',')
}


</script>