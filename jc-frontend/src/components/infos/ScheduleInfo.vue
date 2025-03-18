<template>
      <BaseCarousel :length="items.length || 0">
        <div v-for="(item, index) in items" class="shrink-0 flex items-center justify-center w-full">
          <BaseCard 
              class="w-2/3 text-primary pb-16">
              <div class="flex flex-col justify-center pb-2">
                <p class="pt-2 text-2xl font-bold text-center">{{ item.name }}</p>
                <p class="pb-2 text-lg font-medium text-center">{{ formatTime(item.time) }}</p>
              </div>
              <div class="max-lg:text-sm" v-for="(trainee, index) in item.trainees">
                <div class="border-b flex justify-between">
                  <div class="flex">
                    <p class="pr-6 pl-2">{{ index + 1 }}</p>
                    <p>{{ trainee.Trainee.name }}</p>
                  </div>
                </div>
              </div>
            </BaseCard>
        </div>
      </BaseCarousel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatTime } from '@/utils/dateUtils';
import ScheduleService from '@/service/ScheduleService';
import BaseCard from '../bases/BaseCard.vue';
import BaseCarousel from '../bases/BaseCarousel.vue';

const items = ref({})

onMounted(async () => {
    await fetchInfo();
});

const fetchInfo = async () => {
    const info = await ScheduleService.findInfo()
    items.value = formatedInfo(info)
}

const formatedInfo = (info) => {
  const {actualSession, lastSession, nextSession} = info

  console.log(lastSession)
  console.log(actualSession)
  console.log(nextSession)

  const formatedInfo = 
      [
        {
          name: "Sessão anterior",
          time: lastSession.time || null,
          trainees: lastSession.TraineeSessions || null
        },
        {
          name: "Sessão atual",
          time: actualSession.time || null,
          trainees: actualSession.TraineeSessions || null
        },
        {
          name: "Proxima sessão",
          time: nextSession.time || null,
          trainees: nextSession.TraineeSessions || null
        },
      ]

      return formatedInfo.filter(item => item.trainees && item.trainees.length > 0);

} 
</script>