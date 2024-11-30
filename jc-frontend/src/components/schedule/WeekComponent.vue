<template>
  <div class="flex flex-col  pb-2 "  >
    <p class="text-md md:text-lg ">Horários dos Alunos:</p>
    <div class="flex justify-between mt-2" >
      <div v-for="(day, index) in daysOfWeek" :key="index"
        class="flex flex-col items-center justify-center w-28 rounded-lg border border-black aspect-square" :class="{
          'bg-zinc-900': !hasClass(index),
          'bg-green-500': hasClass(index),
          'text-black': hasClass(index),
        }">
        <span>{{ day }}</span>
        <div v-if="hasClass(index)" class="text-xs mt-1">
          <div v-for="(session, index) in getSessionsForDay(index)" :key="index">
            {{ session.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  traineeSessions: {
    type: Array,
    required: true,
  },
});

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];


const hasClass = (dayIndex) => {
  return props.traineeSessions.some(
    (session) => session.dayOfWeek === dayIndex
  );
};


const getSessionsForDay = (dayIndex) => {
  return props.traineeSessions.filter(
    (session) => session.dayOfWeek === dayIndex
  );
};
</script>