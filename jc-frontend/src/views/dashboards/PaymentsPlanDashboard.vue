<template>
    <div class="dashboard">
        <BaseDashboard title="Planos de Pagamentos"> 
            <template #header>
                <img src="../../assets/icons/add.png" alt="Adicionar" class="cursor-pointer" @click="openModalForAddPlan">
            </template>
            <template #body>
                <PaymentsPlanList :paymentsPlan="paymentsPlan" @sendSelected="openModalForEditPlan"></PaymentsPlanList>
            </template>
        </BaseDashboard>

    <BaseModal ref="modalRefUpdate" :onClose="handlerOnCloseModal">
      <template #title>
        Atualizar Plano de Pagamento
      </template>
      <template #content>
        <PaymentPlanUpdate :plan="paymentPlanSelected" @plan-updated="onSend"/>
      </template>
    </BaseModal>

    <BaseModal ref="modalRefAdd" :onClose="handlerOnCloseModal">
      <template #title>
        Adicionar Plano de Pagamento
      </template>
      <template #content>
          <PaymentPlanAdd @plan-created="onSend"/>
      </template>
    </BaseModal>

    <BaseAlert 
        v-if="alert.show" 
        :title="alert.title" 
        :message="alert.message" 
        :alertType="alert.type" 
      />
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
import BaseAlert from '@/components/bases/BaseAlert.vue';

const paymentsPlan = ref([])
const modalRefAdd = ref(null)
const modalRefUpdate = ref(null)
const paymentPlanSelected = ref({})

const alert = {};

onMounted(async () => {
    await fetchPaymentPlan()
})

const onSend = () => {
  modalRefUpdate.value.closeModal()
}

const handlerOnCloseModal = async () => {
    await fetchPaymentPlan()
}

const openModalForAddPlan = () => {
    modalRefAdd.value.openModal()
}

const openModalForEditPlan = (paymentPlan) => {
    paymentPlanSelected.value = paymentPlan
    console.log(paymentPlan)
    modalRefUpdate.value.openModal()
}

const fetchPaymentPlan = async () => {
    try{
        paymentsPlan.value = await PaymentPlanService.findAll()
    }catch(error){
        console.log(error)
    }
} 
</script>