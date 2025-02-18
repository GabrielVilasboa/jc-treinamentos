<template>
  <div>
    <BaseDashboard title="Sessões">
      <template #header>
        <img src="../../assets/icons/add.png" alt="Adicionar" class="cursor-pointer mr-4"
          @click="openModalForAddSessions">
        <BaseFilter title="Filtrar por data" :inputs="filters" @onFilter="handlerFilter" />
      </template>
      <template #body>
        <SessionsList :schedules="schedules" @sendScheduleData="openModalAddTraineeSession"
          @sendSessionId="openModalForDeleteSession" @sendTraineeSessionId="openModalForDeleteTraineeSession" />
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

    <BaseModal ref="modalRefDeleteSession" :onClose="onClose">
      <template #title>
        Excluir sessão!
      </template>
      <template #content>
        <div>
          <p>Você deseja realmente remover esta sessão?</p>
          <div class="flex justify-between mt-6">
            <button class="btn bg-secondary text-primary text-base font-semibold w-5/12" @click="deleteScheduleConfig">
              Desmarcar aulas recorrentes neste horário
            </button>
            <button class="btn bg-secondary text-primary text-base font-semibold w-5/12" @click="deleteSession">
              Remover esta sessão
            </button>
          </div>
        </div>
      </template>
    </BaseModal>

    <BaseModal ref="modalRefDeleteTraineeSession" :onClose="onClose">
      <template #title>
        Desmarcar Aula!
      </template>
      <template #content>
        <div>
          <p>Você deseja realmente desmarcar a aula deste aluno?</p>
          <div class="flex justify-between mt-6">
            <button class="btn bg-secondary text-primary text-base font-semibold w-5/12" @click="deleteTraineeSessionConfig">
              Desmarcar aulas recorrentes neste horário
            </button>
            <button class="btn bg-secondary text-primary text-base font-semibold w-5/12" @click="deleteTraineeSession">
              Desmarcar esta aula
            </button>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { today, firstDayOfNextMonth } from '@/utils/dateUtils';
import { ref, onMounted } from 'vue';
import BaseDashboard from './BaseDashboard.vue';
import BaseModal from '@/components/bases/BaseModal.vue';
import BaseFilter from '@/components/bases/BaseFilter.vue';
import ScheduleService from '@/service/ScheduleService';
import SessionsList from '@/components/sessions/SessionsList.vue';
import AddTraineeSession from '@/components/sessions/AddTraineeSession.vue';
import AddSession from '@/components/sessions/AddSession.vue';
import { addDays } from 'date-fns';
import SessionService from '@/service/SessionService';
import TraineeSessionService from '@/service/TraineeSessionService';
import TraineeSessionConfigService from '@/service/TraineeSessionConfigService';
import ScheduleConfigService from '@/service/ScheduleConfigService';
import { addAlert } from '@/components/alerts/useAlerts';

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
const modalRefDeleteSession = ref(null);
const modalRefDeleteTraineeSession = ref(null);
const sessionId = ref(null)
const sessionDay = ref(null)
const sessionTime = ref(null)
const traineeSession = ref({})
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

const openModalForDeleteSession = (session, day, time) => {
  sessionId.value = session
  sessionDay.value = day
  sessionTime.value = time
  openModal(modalRefDeleteSession.value)
}

const openModalForDeleteTraineeSession = (traineeSessionId, traineeId, time, dayOfWeek) => {

  traineeSession.value = {
    id: traineeSessionId,
    trainee: traineeId,
    time: time,
    dayOfWeek: dayOfWeek
  }

  console.log(traineeSession.value)

  openModal(modalRefDeleteTraineeSession.value)
}

const handlerFilter = async (filter) => {
  if (filter === null) {
    await fetchSchedules();
    return;
  }
  const { startDate, endDate } = filter;

  await fetchSchedules(addDays(startDate, 1), endDate);

}

const deleteSession = async () => {
  try {
    console.log(sessionId.value)
    await SessionService.delete(sessionId.value)
    await forceClose(modalRefDeleteTraineeSession.value)
    
  addAlert({
    title: 'Sucesso!',
    message: `Sucesso em deletar sessão!`,
    alertType: 'success',
    duration: 3000
  });

  } catch (error) {
    console.error(error)

    addAlert({
    title: 'Erro!',
    message: `Ouve um erro ao deletar a sessão!`,
    alertType: 'error',
    duration: 3000
  });
  }
}

const deleteTraineeSession = async () => {
  try {
    await TraineeSessionService.delete(traineeSession.value.id)
    await forceClose(modalRefDeleteTraineeSession.value)

    addAlert({
    title: 'Sucesso!',
    message: `Sucesso em desmarcar sessão!`,
    alertType: 'success',
    duration: 3000
  });
  } catch (error) {

    console.error(error)

    addAlert({
    title: 'Erro!',
    message: `Ouve um erro desmarcar a sessão!`,
    alertType: 'error',
    duration: 3000
  });
  }
}

const deleteTraineeSessionConfig = async () => {
  try {
    const config = await TraineeSessionConfigService.check(traineeSession.value.trainee, traineeSession.value.time, traineeSession.value.dayOfWeek)

    if(!config.exists){
      throw new Error('Sessão de aluno não recorrente!')
    }

    console.log(config)

    await TraineeSessionConfigService.delete(config.id)
    await forceClose(modalRefDeleteTraineeSession.value)

    addAlert({
      title: 'Sucesso!',
      message: `Sucesso ao desmarcar aula!`,
      alertType: 'success',
      duration: 3000
    });
    
  } catch (error) {
    console.error(error)

    addAlert({
      title: 'Erro!',
      message: `Erro ao desmarcar aula!`,
      alertType: 'error',
      duration: 3000
    });
  }
}

const deleteScheduleConfig = async() => {
  try {

    const config = await ScheduleConfigService.findId(sessionDay.value, sessionTime.value) 

    if (!config){
      throw Error("Sessão não recorrente")
    }
    
    await ScheduleConfigService.delete(config.id)
    await forceClose(modalRefDeleteSession.value)

    addAlert({
      title: 'Sucesso!',
      message: `Sucesso ao deletar sessão recorrente!`,
      alertType: 'success',
      duration: 3000
    });

  } catch (error) {
    console.error("erro ao deletar ScheduleConfig: " + error)
    
    addAlert({
      title: 'Erro!',
      message:'error ao deletar sessão recorrente!',
      alertType: 'error',
      duration: 3000
    });
  }
  
}
const fetchSchedules = async (startDate = addDays(today, 1), endDate = firstDayOfNextMonth) => {
  try {
    const params = { startDate, endDate }
    const data = await ScheduleService.findAll(params);
    schedules.value = data;
  } catch (error) {
    console.error('Erro ao buscar Sessoes:', error);
  }
};

</script>