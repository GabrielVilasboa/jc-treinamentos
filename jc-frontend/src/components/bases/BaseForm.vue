<template>
    <form @submit.prevent autocomplete="off" :class="formClass">
            <BaseInput v-for="(input, index) in inputs" 
            v-model="model[input.id]"
            :id="input.id"
            :label="input.label"
            :placeholder="input.placeholder || input.label"
            :format="input.format"
            :step="input.step"
            :max="input.max"
            :min="input.min"
            :class="input.class"
            :type="input.type"
            :error="errors[input.id]"
            />

            <BaseSelect v-for="(select, index) in selects"
            v-model="model[select.id]"
            :label="select.label"
            :default="select.default"
            :id="select.id"
            :list="select.list"
            :labelFormatter="select.formatter"
            :error="errors[select.id]"
            :class="select.class"
            />

            <BaseTextarea v-for="(textarea, index) in textareas"
            v-model="model[textarea.id]"
            :label="textarea.label"
            :placeholder="textarea.placeholder"
            :id="textarea.id"
            :class="textarea.class"
            />

            <button @click="handlerSubmit()"
                class="btn btn-primary w-full py-2 mt-4 text-white text-lg font-bold transition-shadow duration-300 hover:shadow-lg active:shadow-sm">
                {{button}}
            </button>
    </form>
</template>

<script setup >
import {ref} from 'vue'
import BaseInput from './BaseInput.vue';
import BaseTextarea from "../bases/BaseTextarea.vue";
import BaseSelect from '../bases/BaseSelect.vue';
import { addAlert } from '../alerts/useAlerts.js';

const props = defineProps({
    model: {type: Object,required: true,},
    button: {type: String,required: true,},
    formClass: {type: String, default: "flex flex-wrap gap-4",},
    onSubmit: {type: Function, required: true,},
    errorsHint: {type: String, required: false,},
    
  inputs: {
    type: Array,
    required: true,
    validator(value) {
      return value.every(
        (input) =>
          typeof input === "object" &&
          input.id &&
          typeof input.id === "string" &&
          input.label &&
          typeof input.label === "string" &&
          (!input.type || typeof input.type === "string") &&
          (!input.placeholder || typeof input.placeholder === "string") &&
          (!input.format || typeof input.format === "string") &&
          (!input.step || typeof input.step === "number") &&
          (!input.max || typeof input.max === "number") &&
          (!input.min || typeof input.min === "number") &&
          (!input.class || typeof input.class === "string")
      );
    },
  },
  selects: {
    type: Array,
    required: false,
    default: () => [],
    validator(value) {
      return value.every(
        (select) =>
          typeof select === "object" &&
          select.id &&
          typeof select.id === "string" &&
          select.label &&
          typeof select.label === "string" &&
          Array.isArray(select.list) &&
          (!select.default || typeof select.default === "string") &&
          (!select.formatter || typeof select.formatter === "function") &&
          (!select.class || typeof select.class === "string")
      );
    },
  },
  textareas: {
    type: Array,
    required: false,
    default: () => [],
    validator(value) {
      return value.every(
        (textarea) =>
          typeof textarea === "object" &&
          textarea.id &&
          typeof textarea.id === "string" &&
          textarea.label &&
          typeof textarea.label === "string" &&
          (!textarea.placeholder || typeof textarea.placeholder === "string") &&
          (!textarea.class || typeof textarea.class === "string")
      );
    },
  },
  requiredFields: {
      type: Array,
      required: false,
      default: () => [],
      validator(value) {
          return value.every((field) => typeof field === "string");
        },
  },
     
});

const errors = ref({})

const handlerSubmit = async () => {
  try {
  clearErrors();
  verifyFields();
  
  if (verifyErrors()) {
    console.warn("Required fields are empty!");
    return;
  }

  await props.onSubmit();
  console.log("Sucesso em " + props.errorsHint + "!");

  addAlert({
    title: 'Sucesso!',
    message: `Sucesso em ${props.errorsHint}!`,
    alertType: 'success',
    duration: 3000
  });

} catch (error) {
  console.error(error);

  addAlert({
    title: 'Erro!',
    message: `Houve um erro em ${props.errorsHint}!`,
    alertType: 'error',
    duration: 3000
  });
}
}

const verifyFields = () => {
    props.requiredFields.forEach((field) => {
      if (!props.model[field]) {
        errors.value[field] = `Por favor, insira um valor neste campo.`;
      }
    });
}

const verifyErrors = () => {
    return (Object.values(errors.value).length > 0)
}

const clearErrors = () => {
  errors.value = {};
};

</script>
