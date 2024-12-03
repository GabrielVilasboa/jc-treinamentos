<template>
  <div class="dashboard">
    <BaseDashboard :title="$message.traineesDashboard.title" >
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

    <BaseModal ref="modalRefUpdate" :onClose="handlerOnCloseModal">
      <template #title>
        Atualizar Aluno
      </template>
      <template #content>
        <TraineeUpdate :trainee="traineeForUpdate"></TraineeUpdate>
      </template>
    </BaseModal>

    <BaseModal ref="modalRefAdd" :onClose="handlerOnCloseModal">
      <template #title>
        Adicionar Aluno
      </template>
      <template #content>
        <TraineeAdd />
      </template>
    </BaseModal>

    <BaseModal ref="modalRefDisabled" :onClose="handlerOnCloseModal">
      <template #title>
        Mudar Status Do Aluno
      </template>
      <template #content>
        <TraineeTradeStatus 
        :trainee="traineeForUpdate"
        :closeModal="closeModalTradeStatus"/>
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
import TraineeTradeStatus from '@/components/trainees/TraineeTradeStatus.vue';


const trainees = ref([]);
const searchTerm = ref(''); 
const modalRefAdd = ref(null);
const modalRefUpdate = ref(null);
const modalRefDisabled = ref(null);
const traineeForUpdate = ref({})


onMounted(async () => {
  await getTrainees();
});

const openModal = (modalRef) => {
  modalRef.openModal();
}

const closeModalTradeStatus = () => {
  modalRefDisabled.value.closeModal()
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

const getTrainees = async (name = '') => {
  try {
    const data = await TraineeService.findWithAditionalData({ name });
    trainees.value = data;
  } catch (error) {
    console.error('Erro ao buscar trainees:', error);
  }
};
</script>
