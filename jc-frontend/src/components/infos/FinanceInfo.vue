<template>
    <div class="flex flex-wrap justify-center  gap-y-4">
        <BaseCard class="w-2/3 px-4 py-3">
            <h1 class="text-2xl font-bold mb-1 text-center">Informações</h1>
            <div class="flex max-md:flex-col flex-wrap justify-between mb-4" v-for="(item, index) in items" :key="index">
                <h2 class="w-full text-lg border-b border-zinc-400 mb-2 pb-1 font-bold" >{{ item.name }}</h2>
                <p class="md:w-1/2" v-for="(info, index) in item.info" :key="index">
                    {{ info.description }}: {{info.value}}
                </p>
            </div>
        </BaseCard>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatValueForReal } from '@/utils/formatValue';
import TraineeService from '@/service/TraineeService';
import PaymentService from '@/service/PaymentService';
import BaseCard from '../bases/BaseCard.vue';


onMounted(async () => {
    await fetchInfos();
});

const items = ref([])

const fetchInfos = async () => {
    items.value = [
        await fetchPaymentInfo(),
        await fetchTraineeInfo()

    ]
}

const fetchPaymentInfo = async () => {
    const info = await PaymentService.findInfo()

    const formatedInfo = {
        name: "Financeiro",
        info: [
            { description: "Valor pago", value: `R$  ${formatValueForReal(info.payedValue)}` },
            { description: "Valor a receber", value: `R$ ${formatValueForReal(info.notPayedValue)}`   },
            { description: "Total do mês", value: `R$ ${formatValueForReal(info.totalValue)}`  },
            { description: "Total mês anterior", value:`R$  ${formatValueForReal( info.lastMonthValue)}` }]
    }

    console.log(formatedInfo)
    return formatedInfo
}

const fetchTraineeInfo = async () => {
    const info = await TraineeService.findTraineeInfos()

    const formatedInfo = {
        name: "Alunos",
        info: [
            { description: "Total de alunos", value: info.totalTrainees || 0},
            { description: "Total de alunos ativos", value: info.totalTraineesActived || 0 },
            { description: "Total de alunos inativos", value: info.totalTraineeDesactived || 0  }]
    }

    console.log(formatedInfo)
    return formatedInfo
}
</script>