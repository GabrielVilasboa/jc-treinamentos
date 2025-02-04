

<template>
    <div class="dashboard ">
        <BaseDashboard title="Financeiro">
            <template #body>
                <div class="flex flex-wrap justify-around gap-y-4">
                    <BasicCard class="flex-auto flex-col min-w-52 max-w-[calc(50%-1rem)] max-md:h-min">
                        Numero de Alunos ativos: Numero de Alunos Ativos <br>
                        Lucro Mensal: Lucro Mensal <br>
                    </BasicCard>

                </div>
            </template>
        </BaseDashboard>
    </div>
</template>

<script setup>
import BaseDashboard from './BaseDashboard.vue'
import BasicCard from '../../components/bases/BaseCard.vue';
</script>