<template>
    <div class="dashboard">
      <header
        class="flex flex-row justify-between text-2xl font-semibold mx-4 my-6 text-primary border-b-2 border-secondary">
        {{ $message.traineesDashboard.title }}
  
        <div class="icons flex h-6">
          <BaseSearchBar 
            v-model="searchTerm" 
            placeholder="Pesquisar por nome..." 
            @update:modelValue="getTrainees"
          />
          <img src="../../assets/icons/add.png" alt="Adicionar" class="cursor-pointer" @click="openModalForAddTrainee">
        </div>
      </header>
  
      <TraineeList 
      :trainees="trainees" 
      :ableEdit="true"
      :status-function="openModalForDisabledTrainee"
       @sendSelectedTrainee="openModalForEditTrainee">
      </TraineeList>
  
      <BaseModal ref="modalRefUpdate" :onClose="handlerOnCloseModal">
        <template #title>
          Atualizar Aluno
        </template>
        <template #content>
          <TraineeUpdate :trainee="traineeForUpdate" ></TraineeUpdate>
        </template>
      </BaseModal>

      <BaseModal ref="modalRefAdd" :onClose="handlerOnCloseModal">
        <template #title>
          Adicionar Aluno
        </template>
        <template #content>
          <TraineeAdd/>
        </template>
      </BaseModal>

      <BaseModal ref="modalRefDisabled" :onClose="handlerOnCloseModal">
        <template #title>
          Adicionar Aluno
        </template>
        <template #content>
          Olá
        </template>
      </BaseModal>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import TraineeList from '@/components/trainees/TraineeList.vue';
import BaseModal from '@/components/bases/BaseModal.vue';
import BaseSearchBar from '@/components/bases/BaseSearchBar.vue'; 
import TraineeService from '../../service/TraineeService';
import TraineeAdd from '@/components/trainees/TraineeAdd.vue';
import TraineeUpdate from '@/components/trainees/TraineeUpdate.vue';

const trainees = ref([]);
const searchTerm = ref(''); 
const modalRefAdd = ref(null);
const modalRefUpdate = ref(null);
const modalRefDisabled = ref(null);
const traineeForUpdate = ref({})


const openModal = (modalRef) => {
  modalRef.openModal();
}



const handlerOnCloseModal = async () => {
  console.log("passei aqui")
  await getTrainees()

}

onMounted(async () => {
  await getTrainees();
});

const openModalForEditTrainee = () => {
  openModal(modalRefDisabled.value)
}

const openModalForDisabledTrainee = (trainee) => {
  console.log(trainee)
  traineeForUpdate.value = trainee
  openModal(modalRefUpdate.value)
}

const openModalForAddTrainee = () => {
  openModal(modalRefAdd.value)
}

const getTrainees = async (name = '') => {
  try {
    const data = await TraineeService.findWithAditionalData({ name })
    trainees.value = data;
  } catch (error) {
    console.error('Erro ao buscar trainees:', error);
  }
};
</script>
