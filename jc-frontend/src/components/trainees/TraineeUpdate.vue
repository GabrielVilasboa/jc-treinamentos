<template>
    <form @submit.prevent autocomplete="off">
  
      <div class="sm:flex gap-4">
        <BaseInput 
        v-model="trainee.name"
        label="Nome" 
        placeholder="Nome" 
        id="traineeName" 
        class="mb-2"
        format="name"
        :error="errors.name" />
  
        <BaseInput 
        v-model="trainee.birthDate" 
        label="Data de Nascimento" 
        placeholder="Data de Nascimento" 
        id="birthDate"
        type="date" 
        format="data"
        class="mb-2" 
        :error="errors.birthDate" />
      </div>
  
      <div class="sm:flex gap-4">
        <BaseInput 
        v-model="trainee.cpf" 
        label="CPF" 
        placeholder="CPF" 
        id="cpf" 
        class="mb-2"
        format="cpf" 
        :error="errors.cpf" />
  
        <BaseInput 
        v-model="trainee.phone" 
        label="Telefone" 
        placeholder="Telefone" 
        id="phone" 
        class="mb-2"
        format="phone"
        :error="errors.phone" />
      </div>
  
      <div class="sm:flex gap-4">
        <BaseInput 
        v-model="trainee.emergencyContact" 
        label="Contato de Emergência" 
        placeholder="Contato de Emergência"
        id="emergencyContact" 
        class="mb-2"
        format="phone"
        :error="errors.emergencyContact" />
  
        <BaseInput 
        v-model="trainee.paymentDay" 
        label="Dia de Pagamento" 
        placeholder="Dia de Pagamento" 
        :max="30"
        :min="1"
        id="paymentDay"
        type="number" 
        class="mb-2" 
        :error="errors.paymentDay" />
      </div>
  
      <div class="sm:flex gap-4">
        <BaseInput 
        v-model="trainee.address" 
        label="Endereço"
        placeholder="Endereço" 
        id="address" 
        class="mb-2"
        :error="errors.address" />
  
        <BaseSelect 
        v-model="trainee.paymentPlanId" 
        label="Plano de Pagamento" 
        default="Plano De Pagamento"
        id="paymentPlanId" 
        class="mb-2" 
        :list="paymentPlans" 
        :label-formatter="formatPlanLabel"
        :error="errors.paymentPlanId" />
      </div>
  
      <div class="sm:flex gap-4">
        <BaseTextarea 
        v-model="trainee.observations" 
        label="Observações"  
        placeholder="Escreva as observações sobre o aluno aqui!" 
        id="observations" 
        class="mb-2"
        />
      </div>
  
  
      <button @click="updateTrainee"
        class="btn btn-primary w-full py-2 mt-4 text-white text-lg font-bold transition-shadow duration-300 hover:shadow-lg active:shadow-sm">
        Atualizar Aluno!
      </button>

      <BaseAlert v-if="alert.show" :title="alert.title" :message="alert.message" :alertType="alert.type" />
    </form>
  </template>
  
  <script setup>
  import PaymentPlanService from '@/service/PaymentPlanService';
  import TraineeService from '@/service/TraineeService';
  import BaseInput from '../bases/BaseInput.vue';
  import BaseSelect from '../bases/BaseSelect.vue';
  import { ref, onMounted} from 'vue';
  import BaseTextarea from '../bases/BaseTextarea.vue';

  const props = defineProps({
    trainee: {type: Object, required: true}
  })
  
  const paymentPlans = ref([]);
  const errors = ref({});
  const alert = ref({});
  const requiredFields = ["name", "birthDate", "cpf", "phone", "emergencyContact", "paymentDay", "address", "paymentPlanId"];
  
  onMounted(async () => {
    paymentPlans.value = await PaymentPlanService.findAll();
  });

  
  
  const updateTrainee = async () => {
  
    try {
      clearErrors();
  
      requiredFields.forEach((field) => {
        if (!props.trainee[field]) {
          errors.value[field] = `Por favor, insira um valor neste campo.`;
        }
      });
  
      if (Object.values(errors.value).length > 0) {
        console.warn("Campos obrigatórios faltando", errors.value);
        return;
      }

      console.log(props.trainee)
  
      await TraineeService.update(props.trainee);
      console.log("Trainee atualizado com sucesso");
      showAlert("Sucesso!", "Dados do aluno atualizado com sucesso!", 'success')
    } catch (error) {
      console.error(error)
      showAlert('Erro!', 'Ouve um erro ao atualizar o Aluno', 'error', 4000);
    }
  
  };
  
  const clearErrors = () => {
    errors.value = {};
  };
  
  const formatPlanLabel = (plan) => {
    return `${plan.name} - R$${plan.value}`;
  };
  
  const showAlert = (title, message, type) => {
    alert.value['message'] = message
    alert.value['title'] = title
    alert.value['type'] = type
    alert.value["show"] = true;
    setTimeout(() => {
      alert.value = {};
    }, 3000);
  };
  
  </script>
  