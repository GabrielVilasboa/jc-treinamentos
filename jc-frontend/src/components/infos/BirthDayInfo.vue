<template>
    <div
    v-if="items.length > 0" 
    class="flex flex-wrap justify-center  gap-y-4">
        <div class="w-2/3 px-4 py-3 text-white">
            <h1 class="text-2xl font-bold mb-1 text-center mb-6 ">Aniversariantes do Mês</h1>
            <BaseCarousel :length="items.length">
                <div class="shrink-0 flex items-center justify-center w-full" v-for="(item, index) in items" :key="index">
                <div class="flex flex-col justify-center text-center">
                    <img class="w-60 mb-6 m-auto" :src="getImage()" alt="birthday">
                    <p>{{ item.name }}</p>
                    <p>{{ formatDate(item.birthDate) }} </p>
                </div>
            </div>
            </BaseCarousel>
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import TraineeService from '@/service/TraineeService';
import { formatDate } from '@/utils/dateUtils';
import BaseCarousel from '../bases/BaseCarousel.vue';


onMounted(async () => {
    await fetchInfo();
});

const items = ref([])

const getImage = () => new URL(`/src/assets/icons/birthday/${getRandomIntRange(1,10)}.png`, import.meta.url).href;

function getRandomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const fetchInfo = async () => {
    const info = await TraineeService.findBirthDaysInfo()
    items.value = info

    console.log(info)
}


</script>