<template>
  <div v-for="schedule in schedules">
    <div class="text-primary bg-zinc-950 list-none font-sans px-8 py-2 rounded-lg border border-secondary mb-2"
      v-if="schedule.Sessions.length != 0">
      <BaseAccordion 
      :title="`${formatDate(schedule.date)}` + ' - ' +`${getDayName(schedule.weekDay)}`">
        <div class="flex flex-wrap justify-around gap-y-4 gap-x-2">
          <BaseCard 
            class="flex-auto flex-col w-96 text-primary relative pb-16"
            v-for="(session, index) in schedule.Sessions" 
            :key="index">
            <div class="flex justify-between items-center p-2">
              <p class="  py-2 text-lg font-medium">{{ formatTime(session.time) }}</p>
              <img class="h-6 cursor-pointer" src="../../assets/icons/delete.png" alt="delet session"
                @click="sendSessionId(session.id, schedule.weekDay, session.time )">
            </div>
            <div class="max-lg:text-sm" v-for="(trainee, index) in session.trainees">
              <div class="border-b flex justify-between">
                <div class="flex">
                  <p class="pr-6 pl-2">{{ index + 1 }}</p>
                  <p>{{ trainee.name }}</p>
                </div>
                <div class="tools flex">
                  <img src="../../assets/icons/x.png" class=" h-4 px-2 my-auto cursor-pointer"
                    @click="sendTraineeSessionId(trainee.traineeSessionId, trainee.id, session.time, schedule.weekDay)" />
                </div>
              </div>
            </div>
            <img src="../../assets/icons/add.png" class="absolute bottom-4 right-4 text-end h-6 cursor-pointer"
              @click="sendScheduleData(schedule, session)" />
          </BaseCard>
        </div>
      </BaseAccordion>
    </div>
  </div>
</template>

<script setup>
import { getDayName, formatDate, formatTime } from '@/utils/dateUtils';
import BaseCard from '../bases/BaseCard.vue';
import BaseAccordion from '../bases/BaseAccordion.vue';

const props = defineProps({
  schedules: { type: Array, required: true },
});

const emits = defineEmits(['sendScheduleData', 'sendTraineeSessionId', 'sendSessionId', 'sendScheduleConfigId'])

const sendScheduleData = (schedule, session, message = "") => {
  const dataSend = {
    time: session.time,
    dayOfWeek: schedule.weekDay,
    sessionId: session.id
  }
  emits('sendScheduleData', dataSend, message)
}

const sendSessionId = (sessionId, day, time) => {
  emits ('sendSessionId', sessionId, day, time)
}


const sendTraineeSessionId = async (id, traineeId, time, dayOfWeek) => {
  emits('sendTraineeSessionId', id, traineeId, time, dayOfWeek)
}
</script>