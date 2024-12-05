<template>
    <div class="dashboard">
        <BaseDashboard title="Planos de Pagamentos"> 
            <template #header>
                <img src="../../assets/icons/add.png" alt="Adicionar" class="cursor-pointer" @click="openModalForAddPlan">
            </template>
            <template #body>
                <PaymentsPlanList :paymentsPlan="paymentsPlan" @sendSelected="handleSelectedPlan"></PaymentsPlanList>
            </template>
        </BaseDashboard>

    <BaseModal ref="modalRefUpdate" :onClose="handlerOnCloseModal">
      <template #title>
        Atualizar Plano de Pagamento
      </template>
      <template #content>
        <PaymentPlanUpdate :plan="planSelected" @plan-updated="onClose(modalRefUpdate)"/>
      </template>
    </BaseModal>

    <BaseModal ref="modalRefAdd" :onClose="handlerOnCloseModal">
      <template #title>
        Adicionar Plano de Pagamento
      </template>
      <template #content>
          <PaymentPlanAdd @plan-created="onClose(modalRefAdd)"/>
      </template>
    </BaseModal>

    <BaseModal ref="modalRefDelete" :onClose="handlerOnCloseModal">
      <template #title>
        Mudar Status Do Aluno
      </template>
      <template #content>
        <BaseConfirm
          :name="planSelected.name"
          :onSend="deletePlan"
          :closeModal="() => onClose(modalRefDelete)"
          message="deletar o plano de pagamento"
          buttonMessage="Deletar" 
    />
      </template>
    </BaseModal>
    </div>
</template>

<script setup>

import {ref, onMounted} from 'vue'
import PaymentsPlanList from '@/components/paymentsPlan/PaymentsPlanList.vue';
import PaymentPlanService from '@/service/PaymentPlanService';
import PaymentPlanAdd from '@/components/paymentsPlan/PaymentPlanAdd.vue';
import BaseDashboard from './BaseDashboard.vue';
import BaseModal from '@/components/bases/BaseModal.vue';
import PaymentPlanUpdate from '@/components/paymentsPlan/PaymentPlanUpdate.vue';
import BaseConfirm from '@/components/bases/BaseConfirm.vue';

const paymentsPlan = ref([])
const modalRefAdd = ref(null)
const modalRefUpdate = ref(null)
const modalRefDelete = ref(null)
const planSelected = ref({})

onMounted(async () => {
    await fetchPaymentPlan()
})

const onClose = (modal) => {
  modal.closeModal()
}

const handlerOnCloseModal = async () => {
    await fetchPaymentPlan()
}

const handleSelectedPlan = (plan, message) => {
  switch(message) {
    case 'edit':
      openModalForEditPlan(plan);
      break;
    case 'delete':
      openModalForDeletePlan(plan);
      break;
    default:
      console.error('Ação não reconhecida:', message);
  }
}

const openModalForDeletePlan = (plan) => {
    planSelected.value = plan
    modalRefDelete.value.openModal()
}


const openModalForAddPlan = () => {
    modalRefAdd.value.openModal()
}

const openModalForEditPlan = (paymentPlan) => {
    planSelected.value = paymentPlan
    console.log(paymentPlan)
    modalRefUpdate.value.openModal()
}

const deletePlan = async() => {
    try{
        console.log(planSelected)
        const deleted = await PaymentPlanService.delete(planSelected.value.id)

    }catch(error){
        if(error.response.data.existisTrainees){
            throw new Error("Existem usuarios relacionados")
        }
    }   
}



const fetchPaymentPlan = async () => {
    try{
        paymentsPlan.value = await PaymentPlanService.findAll()
    }catch(error){
        console.log(error)
    }
} 
</script>