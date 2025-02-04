<template>
  <div class="dropdown dropdown-end">
    <img
      tabindex="0"
      role="button"
      src="@/assets/icons/filter.png"
      class="cursor-pointer icons flex h-6"
      aria-haspopup="true"
      aria-expanded="false"
      aria-controls="filter-menu"
    />
    <div
      id="filter-menu"
      tabindex="0"
      class="dropdown-content menu bg-base-100 rounded-box z-[1] min-w-96 p-2 shadow"
    >
      <div class="flex flex-col gap-2 m-2">
        <h1 class="text-lg text-center">{{ title }}</h1>
        <BaseInput
          v-for="(input, index) in inputs"
          :key="input.id"
          v-model="localValue[input.id]"
          :id="input.id"
          :label="input.label"
          :placeholder="input.placeholder || input.label"
          :type="input.type"
        />
        <label v-if="checkbox" class="label cursor-pointer">
          <span span class="label-text">{{checkbox.text}}</span>
          <input type="checkbox" checked="checked" class="checkbox" v-model="localValue[checkbox.id]" />
        </label>

        
        <button
          @click="onFilter"
          class="btn btn-primary w-full py-2 h-8 mt-4 text-white text-lg font-bold transition-shadow duration-300 hover:shadow-lg active:shadow-sm"
        >
          Filtrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import BaseInput from './BaseInput.vue';

const props = defineProps({
  title: String,
  checkbox: {type: Object},
  inputs: {
    type: Array,
    required: true,
    validator(value) {
      return value.every(
        (input) =>
          typeof input === 'object' &&
          input.id &&
          typeof input.id === 'string' &&
          input.label &&
          typeof input.label === 'string' &&
          (!input.type || typeof input.type === 'string')
      );
    },
  },
});

const emits = defineEmits(['onFilter']);

const localValue = ref({});

watchEffect(() => {

  props.inputs.forEach((input) => {
    if (!(input.id in localValue.value)) {
      localValue.value[input.id] = input.model || null;
    }
  });

  if(props.checkbox){
    localValue.value[props.checkbox.id] = props.checkbox.model || null
  }
});

const onFilter = () => {
  console.log(localValue.value)
  emits('onFilter', localValue.value);
};
</script>