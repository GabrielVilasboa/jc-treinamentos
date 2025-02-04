<template>
    <form @submit.prevent>
        <BaseSelect
        v-model="traineeId"
        id="traineeId"
        default="Selecione o aluno:"
        :list="trainees"
        />
        <div class="flex my-4 gap-4 justify-start ">
            <input id="isRecorring" type="checkbox" checked="checked" class="checkbox" v-model="isRecorring" />
            <label class="cursor-pointer" for="isRecorring"> É recorrente?</label>
        </div>

        <button class="btn bg-secondary text-dark text-base font-semibold w-full hover:text-primary" @click="handleAddTraineeSession">
        Adicionar aluno a sessão
      </button>
    </form>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import BaseSelect from '../bases/BaseSelect.vue';
import TraineeService from '@/service/TraineeService';
import TraineeSessionService from '@/service/TraineeSessionService';
import TraineeSessionConfigService from '@/service/TraineeSessionConfigService';
import { addAlert } from '../alerts/useAlerts';
    
const props = defineProps({
    sessionData: {type: Object, required: true},
})

onMounted(async() => {
    await fetchTrainees()
})

const trainees = ref([])
const traineeId = ref(null)
const isRecorring = ref(false)


const emits = defineEmits(['onClose'])

const fetchTrainees = async (name = "") => {
    try {
        trainees.value = await TraineeService.findAll({name})
    } catch (error) {
        console.error("error:" + error.message)
    }
}

const handleAddTraineeSession = async() => {
    const {time, dayOfWeek, sessionId} = props.sessionData

    if(isRecorring.value){
        AddTraineeSessionReccuring(time, dayOfWeek)
        return
    }
    await AddTraineeSession(sessionId)
}

const AddTraineeSession = async(sessionId) => {
try {
    const {exists} = await TraineeSessionService.check(traineeId.value, sessionId)

    console.log(exists)
    if(!exists) {
        const data = {
            traineeId: traineeId.value,
            sessionId: sessionId
        }
        await TraineeSessionService.create(data)  
        addAlert({title: "Sucesso", message: "O aluno foi adicionado a sessão.", alertType: "success"})
        emits('onClose')
        return  
    }
    addAlert({title: "Aviso!", message: "O aluno já está nessa sessão.", alertType: "warning"})
    
} catch (error) {
    console.error('error:'+ error.message)
    addAlert({title: "error!", message: `Algo deu errado: ${error.message}` , alertType: "error"})
}
}

const AddTraineeSessionReccuring = async(time, dayOfWeek) => {
    try {
    const {exists} = await TraineeSessionConfigService.check(traineeId.value, time, dayOfWeek)

    if(!exists) {
        const data = {
            traineeId: traineeId.value,
            time: time,
            dayOfWeek: dayOfWeek
        }
        await TraineeSessionConfigService.create(data)  
        addAlert({title: "Sucesso", message: "O aluno foi adicionado a todas as sessões recorrentes!", alertType: "success"})
        emits('onClose')
        return  
    }
    addAlert({title: "Aviso!", message: "O aluno já está nessa sessão.", alertType: "warning"})
    
} catch (error) {
    console.error('error:'+ error.message)
    addAlert({title: "error!", message: `Algo deu errado: ${error.message}` , alertType: "error"})
}
}


</script>