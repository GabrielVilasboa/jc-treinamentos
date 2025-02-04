<template>
    <table class="table table-zebra">
      <thead>
        <tr class="text-base text-primary">
          <th >Data</th>
          <th >Nome</th>
          <th class="text-center">Valor</th>
          <th class="text-center">Intervalo</th>
          <th class="text-center">Status</th>
          <th class="text-center">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr class="item" v-for="(payment, index) in payments" :key="index">

          <td class="text-left">
            {{ formatDate(payment.paymentDate) }}
          </td>

          <td class="text-left">
            {{ payment.Trainee.name }}
          </td>

          <td class="text-center">
            R$ {{ formatValueForReal(payment.PaymentPlan.value) }}
          </td>

          <td class="text-center align-middle">
            {{ payment.PaymentPlan.billingInterval }} Mês
          </td>
          <td 
            class="text-center align-middle h-full" 
            
          >
            <div class="tooltip " :data-tip="payment.status ? 'Pagamento realizado' : 'Pagamento pendente'">
                <img
                  :src="payment.status ? activedIcon : inactiveIcon"
                  alt="Status Icon"
                  class="block mx-auto h-6 w-6"
                  :class="payment.status ? '' : 'cursor-pointer'"
                  @click="sendPaymentSelected(payment, 'payed')"
                />
            </div>
          </td>

          <td class="items-center justify-center gap-4 h-full" >
            <div class="flex  gap-4 ">
              <img
                src="../../assets/icons/edit.png"
                alt="Edit Icon"
                class="h-6 w-6 cursor-pointer"
                @click="sendPaymentSelected(payment, 'edit')"
              />
              <img
                src="../../assets/icons/delete.png"
                alt="Delete Icon"
                class="h-6 w-6 cursor-pointer"
                 @click="sendPaymentSelected(payment, 'delete')"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  

<script setup>
import activedIcon from '@/assets/icons/actived.png';
import inactiveIcon from '@/assets/icons/inactive.png';

import { formatValueForReal } from '@/utils/formatValue';
import { formatDate } from '@/utils/dateUtils';

const props = defineProps({
    payments: { type: Array, required: true }
})

const emits = defineEmits(['sendPaymentSelected'])

const sendPaymentSelected = (payment, message) =>{
    emits('sendPaymentSelected', payment, message )
}
</script>