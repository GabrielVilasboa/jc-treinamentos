<script setup>
import { ref } from 'vue';
import BasicCard from '../BasicCard.vue';
import Controller from '../../service/index.js';
import PaymentPlans from '@/models/PaymentPlans';

// Criação da instância de Controller
const controller = new Controller();
const trainees = controller.trainees

let monthValue = 0

trainees.forEach(trainee => {
    if(trainee.isActivate){
        monthValue += trainee.paymentPlan.value
    }
});
</script>

<template>
    <div class="dashboard">
        <h1>{{ $message.financeDashboard.title }}</h1>
        <div class="cards">
            <BasicCard> 
                Numero de Alunos ativos: {{ trainees.length }} <br>
                Lucro Mensal: {{ monthValue }} <br>

            </BasicCard>
            <BasicCard> Olá  Mundo</BasicCard>


        </div>
    </div>
</template>

<style scoped> 
    h1 {
        width: 100%;
        text-align: left;
    } 
    
    .cards{
        margin-top: var(--spacing-large-x) ;
        width: 80vw;
        max-width:1500px ;
        justify-content: space-around;
        display: flex;
        flex-wrap:wrap;
        gap: var(--spacing-large-xx);
    }
</style>

