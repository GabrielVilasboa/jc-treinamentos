<script setup>
import BasicCard from '../../components/BasicCard.vue';
</script>

<template>
    <div class="dashboard ">
        <h1>{{ $message.financeDashboard.title }}</h1>
        <div class="cards ">
            <BasicCard>
                Numero de Alunos ativos: Numero de Alunos Ativos <br>
                Lucro Mensal: Lucro Mensal <br>

            </BasicCard>
            <BasicCard> Olá Mundo</BasicCard>


        </div>
    </div>
</template>

<style scoped>
h1 {
    width: 100%;
    text-align: left;
}

.cards {
    margin-top: var(--spacing-large-x);
    width: 80vw;
    max-width: 1500px;
    justify-content: space-around;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-large-xx);
}
</style>
