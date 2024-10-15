<template>
    <div class="dashboard">
        <h1>{{ $message.traineesDashboard.title }}</h1>
        <ul>
            <li class="trainee-list" v-for="(trainee, index) in trainees" :key="index">
                <div class="main-infos">
                    <p class="name">{{ trainee.name }}</p>
                    <img
                        class="open-close"
                        :class="isOpen[index] ? 'rotated-true' : 'rotated-false'"
                        src="../assets/icons/openClose.png"
                        alt="openOrClose"
                        @click="openItem(index)"
                    />
                </div>
                <div class="all-data" v-if="isOpen[index]">
                    Idade: {{ trainee.age }}<br />
                    Proximo Pagamento: {{ trainee.nextPaymentDate }}<br />
                    Valor do Pagamento: {{ trainee.paymentPlan.value }} R$<br />
                    Aluno está ativo? {{ trainee.isActivate ? "SIM" : "NÃO" }}
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
        transform: rotate(180deg); /* Girar a imagem */
    }

    .rotated-false {
        transform: rotate(0deg);
    }
</style>

<script setup>
import { ref } from 'vue';
import Controller from '../controller/index.js';

const controller = new Controller();
const trainees = controller.trainees;

const isOpen = ref(Array(trainees.length).fill(false)); // Inicializa o array para controlar os itens abertos

function openItem(index) {
    isOpen.value[index] = !isOpen.value[index]; // Alterna o estado de aberto/fechado
}
</script>
