<template>
    <div class="dashboard">
        <h1>{{ $message.traineesDashboard.title }}</h1>
        <ul>
            <li class="trainee-list" v-for="(trainee, index) in trainees" :key="index">
                <div class="main-infos">
                    <p class="name"> {{trainee.name}}</p>
                    <img class="open-close" :class="isOpen[index] ? 'rotated-true' : 'rotated-false'"
                        src="../../assets/icons/openClose.png" alt="openOrClose" @click="openItem(index)" />
                </div>
                <div class="all-data" v-if="isOpen[index]">
                    Idade: {{ trainee.age}}<br />
                    Data de Aniversário: {{formatDate(trainee.birthDate)}}<br />
                    CPF: {{ formatCPF(trainee.cpf) }}<br />
                    Data de pagamento: {{ trainee.paymentDay }} <br />
                    Valor do Pagamento: {{trainee.PaymentPlan.value.toFixed(2).replace('.', ',')}} R$<br />
                    Aluno está ativo? {{ trainee.isActive? "Sim" : "Não" }} <br />
                    Telefone: {{ trainee.phone }} <br/>
                    Contato de Emergencia: {{ trainee.emergencyContact}}
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
h1 {
    width: 100%;
    text-align: left;
}

.name {
    color: var(--dark-text-color);
}

.main-infos {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.open-close {
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
}

.all-data {
    color: var(--dark-text-color);
}

.rotated-true {
    transform: rotate(180deg);
    /* Girar a imagem */
}

.rotated-false {
    transform: rotate(0deg);
}
</style>

<script setup>

import {format} from 'date-fns'
import { ref, onMounted } from 'vue';
import { formatCPF } from '../../utils/format-cpf';
import TraineeService from '../../service/TraineeService';



const trainees = ref([]);
const isOpen = ref([]);


onMounted(() => {
    trainees.value = getTrainees()
})

const getTrainees = async () => {
    try {
        const data = await TraineeService.findWithAditionalData()
        trainees.value = data;
        isOpen.value = Array(data.length).fill(false);
    } catch (error) {
        console.error("Error fetching trainees:", error);
    }
}

const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

const openItem = (index) => {
  console.log(trainees);
  isOpen.value[index] = !isOpen.value[index];
};


</script>
