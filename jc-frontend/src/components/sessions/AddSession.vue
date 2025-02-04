<template>
        <div>
          <label class="label cursor-pointer flex justify-start">
          <input type="checkbox" checked="checked" class="checkbox mr-4" v-model="isRecurring" />
          <span class="label-text">Sessão recorrente?</span>
        </label>
          <BaseForm v-if="isRecurring"
          :model="session"
          :requiredFields="requiredFieldsIsRecurring"
          :onSubmit="addSessionRecorring"
          errorsHint="adicionar sessão"
          :inputs="inputsAddRecorring "
          :selects="select"
          button="Adicionar sessão recorrente!"
          />
          <BaseForm v-else
          :model="session"
          :requiredFields="requiredFields"
          :onSubmit="addSession"
          errorsHint="adicionar sessão"
          :inputs="inputsAddNotRecorrings"
          button="Adicionar sessão!"
          />
        </div>
  </template>
  
  <script setup>
  import { ref} from 'vue';
  import {inputsAddNotRecorrings, inputsAddRecorring, select} from './SessionFields.js'
  import BaseForm from '../bases/BaseForm.vue';
  import SessionService from '@/service/SessionService.js';
  import ScheduleConfigService from '@/service/ScheduleConfigService.js';


  const isRecurring = ref(true)
  const requiredFields = ['date', 'schedule'];
  const requiredFieldsIsRecurring = ['dayOfWeek', 'schedule'];
  const session = ref({})
  
  const emits = defineEmits(['addSession'])
  
  const addSession = async () => {
      const data = {
        time: session.value.schedule , date: session.value.date , maxTrainee: 12 
      }
      await SessionService.create(data);
      session.value = {}
      emits('addSession')
  };

  const addSessionRecorring = async () => {
    console.log(session)
    const data = {
        time: session.value.schedule , day: session.value.dayOfWeek
      }
      await ScheduleConfigService.create(data)
      session.value = {}
      emits('addSession')
  }
  
  </script>
  