<template>
  <div class="dashboard">
    <BaseDashboard 
    :title="$message.traineesDashboard.title"
    >
      <template #header>
          <BaseSearchBar 
            v-model="searchTerm" 
            placeholder="Pesquisar por nome..." 
            @update:modelValue="getTrainees"
          />
          <img src="../../assets/icons/add.png" alt="Adicionar" class="cursor-pointer" @click="openModalForAddTrainee">
      </template>

      <template #body>
        <TraineeList 
          :trainees="trainees" 
          :ableEdit="true"
          @sendSelectedTrainee="handleSelectedTrainee">
        </TraineeList>
      </template>
    </BaseDashboard>


    <BaseModal ref="modalRefAdd" :onClose="getTrainees">
      <template #title>
        Adicionar Aluno
      </template>
      <template #content>
        <TraineeAdd @addTrainee="forceClose(modalRefAdd)"/>
      </template>
    </BaseModal>
    
     <BaseModal ref="modalRefUpdate" :onClose="getTrainees">
      <template #title>
        Atualizar Aluno
      </template>
      <template #content>
        <TraineeUpdate :trainee="traineeForUpdate" @updatedTrainee="forceClose(modalRefUpdate)"></TraineeUpdate>
      </template>
    </BaseModal>


    <BaseModal ref="modalRefDisabled" :onClose="getTrainees">
      <template #title>
        Mudar Status Do Aluno
      </template>
      <template #content>
        <BaseConfirm
          :name="traineeForUpdate.name"
          :onSend="changeStatus"
          :closeModal="() => forceClose(modalRefDisabled)"
          :message="(traineeForUpdate.isActive ? 'desativar' : 'ativar') + ' o aluno'"
          :buttonMessage="(traineeForUpdate.isActive ? 'Desativar' : 'Ativar')" 
    />
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseDashboard from './BaseDashboard.vue';
import TraineeList from '@/components/trainees/TraineeList.vue';
import BaseModal from '@/components/bases/BaseModal.vue';
import BaseSearchBar from '@/components/bases/BaseSearchBar.vue'; 
import TraineeService from '../../service/TraineeService';
import TraineeAdd from '@/components/trainees/TraineeAdd.vue';
import TraineeUpdate from '@/components/trainees/TraineeUpdate.vue';

import BaseConfirm from '@/components/bases/BaseConfirm.vue';


const trainees = ref([]);
const searchTerm = ref(''); 
const modalRefAdd = ref(null);
const modalRefUpdate = ref(null);
const modalRefDisabled = ref(null);
const traineeForUpdate = ref({})


onMounted(async () => {
  await getTrainees();
});

const forceClose = (modalRef) => {
  modalRef.closeModal()
}

const openModal = (modalRef) => {
  modalRef.openModal();
}

const handlerOnCloseModal = async () => {
  await getTrainees();
}

const openModalForEditTrainee = (trainee) => {
  traineeForUpdate.value = trainee;
  openModal(modalRefUpdate.value);
}

const handleSelectedTrainee = (trainee, message) => {
  switch(message) {
    case 'edit':
      openModalForEditTrainee(trainee);
      break;
    case 'disabled':
      openModalForDisabledTrainee(trainee);
      break;
    default:
      console.error('Ação não reconhecida:', message);
  }
}

const openModalForDisabledTrainee = (trainee) => {
  traineeForUpdate.value = trainee;
  openModal(modalRefDisabled.value);
}

const openModalForAddTrainee = () => {
  openModal(modalRefAdd.value);
}

const changeStatus = async () => {
  try {
    await TraineeService.tradeStatus(traineeForUpdate.value.id);
  } catch (error) {
    console.error(error.message)
    throw new Error('Falha ao mudar status!')
  }
};

const getTrainees = async (name = '') => {
  try {
    const data = await TraineeService.findWithAditionalData({ name });
    trainees.value = data;
  } catch (error) {
    console.error('Erro ao buscar trainees:', error);
  }
};
</script>
