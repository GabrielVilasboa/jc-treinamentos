

<template>
    <div class="dashboard ">
        <BaseDashboard title="Painel">
            <template #body>
                <FinanceInfo/>
                <ScheduleInfo class="my-8"/>
                <BirthDayInfo/>
            </template>
        </BaseDashboard>
    </div>
</template>

<script setup>
import { ref, onMounted} from 'vue'

import BaseDashboard from './BaseDashboard.vue'
import FinanceInfo from '@/components/infos/FinanceInfo.vue';
import ScheduleInfo from '@/components/infos/ScheduleInfo.vue';
import BirthDayInfo from '@/components/infos/BirthDayInfo.vue'

onMounted(async () => {
  });

const items = ref([])


</script>