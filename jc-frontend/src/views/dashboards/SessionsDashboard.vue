<template>
  <div>
    <BaseDashboard title="Sessões">
      <template #header>
        <img src="../../assets/icons/add.png" alt="Adicionar" class="cursor-pointer mr-4" @click="openModalForAddSessions">
        <BaseFilter title="Filtrar por data" :inputs="filters" @onFilter="handlerFilter" />
      </template>
      <template #body>
        <SessionsList :schedules="schedules" @sendScheduleData="openModalAddTraineeSession" />
      </template>
    </BaseDashboard>

    <BaseModal ref="modalRefAddTraineeSession" :onClose="onClose">
      <template #title>
        Adicionar aluno a sessão!
      </template>
      <template #content>
        <AddTraineeSession :sessionData="sessionData" @onClose="forceClose(modalRefAddTraineeSession)" />
      </template>
    </BaseModal>

    <BaseModal ref="modalRefAddSession" :onClose="onClose">
      <template #title>
        Adicionar sessão!
      </template>
      <template #content>
        <AddSession :sessionData="sessionData" @onClose="forceClose(modalRefAddTraineeSession)" />
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { today, firstDayOfNextMonth} from '@/utils/dateUtils';
import { ref, onMounted } from 'vue';
import BaseDashboard from './BaseDashboard.vue';
import BaseModal from '@/components/bases/BaseModal.vue';
import BaseFilter from '@/components/bases/BaseFilter.vue';
import ScheduleService from '@/service/ScheduleService';
import SessionsList from '@/components/sessions/SessionsList.vue';
import AddTraineeSession from '@/components/sessions/AddTraineeSession.vue';
import AddSession from '@/components/sessions/AddSession.vue';
import { addDays } from 'date-fns';

const filters = ref([
  {
    model: ref(today),
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

const modalRefAddTraineeSession = ref(null);
const modalRefAddSession = ref(null);
const sessionData = ref({})
const schedules = ref([])


onMounted(async () => {
  await fetchSchedules();
});

const forceClose = async (modalRef) => {
  await modalRef.closeModal()
}

const onClose = async () => {
  await fetchSchedules();
}

const openModal = (modalRef) => {
  modalRef.openModal();
};

const openModalAddTraineeSession = (data, message) => {
  sessionData.value = data
  openModal(modalRefAddTraineeSession.value)
}

const openModalForAddSessions = () => {
  openModal(modalRefAddSession.value)
}

const handlerFilter = async (filter) => {
  if (filter === null) {
    await fetchSchedules();
    return;
  }
  const { startDate, endDate } = filter;

  await fetchSchedules(addDays(startDate, 1), endDate);

}

const fetchSchedules = async (startDate = addDays(today, 1), endDate = firstDayOfNextMonth) => {
  try {
    const params = { startDate, endDate}
    const data = await ScheduleService.findAll(params);
    schedules.value = data;
  } catch (error) {
    console.error('Erro ao buscar Sessoes:', error);
  }
};
</script>