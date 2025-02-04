<template>
    <div>
      <BaseDashboard title="Pagamentos">
        <template #header>
          <BaseSearchBar
            v-model="searchTerm"
            :hasFilterButton="true"
            placeholder="Pesquisar por nome..."
            @update:modelValue="handlerFilter(filterData)"
          />
          <BaseFilter
            title="Filtrar por data"
            :inputs="filters"
            :checkbox="checkbox"
            @onFilter="handlerFilter"
          />
        </template>
        <template #body>
          <PaymentsList :payments="payments" @sendPaymentSelected="handlePaymentSelected" />
        </template>
      </BaseDashboard>

      <BaseModal ref="modalRefEdit" :onClose="onClose">
        <template #title>
          Atualizar Pagamento!
        </template>
        <template #content>
          <PaymentUpdate :payments="paymentSelected" @paymentUpdated="forceClose(modalRefEdit)" />
        </template>
      </BaseModal>
  
      <BaseModal ref="modalRefConfirmPayment" :onClose="onClose">
        <template #title>
          Confirmar Pagamento
        </template>
        <template #content>
          <BaseConfirm
            :onSend="confirmPayment"
            :closeModal="() => forceClose(modalRefConfirmPayment)"
            message="Confirmar pagamento"
            buttonMessage="Confirmar pagamento!"
            alert="Essa ação é irreversível"
          />
        </template>
      </BaseModal>
  
      <BaseModal ref="modalRefDelete" :onClose="onClose">
        <template #title>
          Deletar Pagamento!
        </template>
        <template #content>
          <BaseConfirm
            :onSend="confirmDelete"
            :closeModal="() => forceClose(modalRefDelete)"
            message="Deletar pagamento"
            buttonMessage="Deletar pagamento!"
          />
        </template>
      </BaseModal>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { today, firstDayMonth, firstDayOfNextMonth } from '@/utils/dateUtils';
  import PaymentsList from '@/components/payments/PaymentsList.vue';
  import BaseDashboard from './BaseDashboard.vue';
  import BaseFilter from '@/components/bases/BaseFilter.vue';
  import BaseConfirm from '@/components/bases/BaseConfirm.vue';
  import BaseModal from '@/components/bases/BaseModal.vue';
  import BaseSearchBar from '@/components/bases/BaseSearchBar.vue';
  import PaymentService from '@/service/PaymentService';
  import PaymentUpdate from '@/components/payments/PaymentUpdate.vue';
  
  const filters = ref([
    {
      model: ref(firstDayMonth),
      id: 'startDate',
      type: 'date',
      label: 'Data inicial',
    },
    {
      model: ref(firstDayOfNextMonth),
      id: 'endDate',
      type: 'date',
      label: 'Data final',
    },
  ]);

  const checkbox = ref({
    id: 'status',
    text: 'Mostrar pagamentos realizados?',
    model: ref(null)
  })
  
  const payments = ref([]);
  const searchTerm = ref('');
  const filterData = ref({
    startDate: firstDayMonth,
    endDate: firstDayOfNextMonth,
    status: false
  })
  const paymentSelected = ref({});
  const modalRefEdit = ref(null);
  const modalRefDelete = ref(null);
  const modalRefConfirmPayment = ref(null);
  
  onMounted(async () => {
    await fetchPayments();
  });
  
  const forceClose = (modalRef) => {
    modalRef.closeModal();
  };

  const onClose = async() => {
    await handlerFilter(null)
  }
  
  const confirmPayment = async () => {
    try {
      await PaymentService.confirmPayment(paymentSelected.value.id);
    } catch (error) {
      console.error(error.message);
      throw new Error('Falha ao confirmar pagamento!');
    }
  };
  
  const confirmDelete = async () => {
    try {
      await PaymentService.delete(paymentSelected.value.id);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao deletar pagamento!');
    }
  };
  
  const handlePaymentSelected = (payment, message) => {
    paymentSelected.value = payment;
    switch (message) {
      case 'edit':
        openModal(modalRefEdit.value);
        break;
      case 'delete':
        openModal(modalRefDelete.value);
        break;
      case 'payed':
        if (!paymentSelected.value.status) {
          openModal(modalRefConfirmPayment.value);
        }
        break;
      default:
        console.error('Mensagem desconhecida:', message);
    }
  };
  
  const openModal = (modalRef) => {
    modalRef.openModal();
  };

  const handlerFilter = async (filter) => {
  if (filter === null) {
    await fetchPayments(searchTerm.value, filterData.value.startDate, filterData.value.endDate, filterData.value.status);
    return;
  }
  const { startDate, endDate, status } = filter;

  filterData.value.startDate = startDate === null ? filterData.value.startDate : startDate
  filterData.value.endDate = endDate === null ? filterData.value.endDate : endDate  
  filterData.value.status = status === null ? filterData.value.status : status  

  await fetchPayments(searchTerm.value, filterData.value.startDate, filterData.value.endDate, filterData.value.status);

}

  const fetchPayments = async (traineeName = "", startDate = firstDayMonth, endDate = firstDayOfNextMonth, status = false) => {
    console.log(traineeName, startDate, endDate, status )
    try {
      const data = await PaymentService.findAll({
        startDate,
        endDate,
        traineeName,
        status: status? null : false 
      });
  
      payments.value = data;
    } catch (error) {
      console.error('Erro ao buscar Payments:', error);
    }
  };
  </script>
  