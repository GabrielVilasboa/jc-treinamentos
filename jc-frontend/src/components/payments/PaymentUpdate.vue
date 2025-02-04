<template>
    <BaseForm
      :model="payments"
      :requiredFields="requiredFields"
      :onSubmit="updatePayment"
      button="Atualizar pagamento!"
      errorsHint="atualizar pagamento"
      :inputs="inputs"
      :selects="select(paymentPlans, formatPlanLabel)"
    />
  </template>
    
    <script setup>
  
    import {onMounted, ref} from 'vue'
    import { select, inputs } from './PaymentsFields';
    import { formatValueForReal } from '@/utils/formatValue';
    import paymentsService from "@/service/PaymentService";
    import PaymentPlanService from "@/service/PaymentPlanService";
    import BaseForm from "../bases/BaseForm.vue";

    onMounted(async () => {
        paymentPlans.value = await PaymentPlanService.findAll();
        console.log(paymentPlans.value)
     });

    

    const props = defineProps({
        payments: {type: Object, required: true},
    })

    const emit = defineEmits(['paymentUpdated'])

    const paymentPlans = ref([]);
    const requiredFields = ["paymentDate"];
  
    const updatePayment = async () => {
      const paymentFormated = formatPayment(props.payments)
      console.log(paymentFormated)
      await paymentsService.update(paymentFormated);
      emit("paymentUpdated")
    };
    
    const formatPayment = (payment) => {
      console.log(payment)
        return {
        id: payment.id,
        paymentDate: payment.paymentDate,
        paymentPlanId: payment.paymentPlanId,
        }
    }

    const formatPlanLabel = (plan) => {
        return `${plan.name} - R$${formatValueForReal(plan.value)} - Frequência: ${plan.numberDaysPerWeek} Dias por semana `;
    };
    </script>
    
    
  