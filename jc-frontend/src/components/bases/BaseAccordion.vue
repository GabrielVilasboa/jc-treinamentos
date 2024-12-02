<template>
    <div class="main-infos flex flex-row justify-between items-center max-lg:max-w-full" :class="width">
      <div class="flex">
        <img 
          v-if="icon" 
          :src="icon" 
          class="h-5 mr-4 self-center" 
          :class="iconFunction ? 'cursor-pointer' : 'cursor-auto'" 
          @click="iconFunction ? iconFunction() : null"
        />
        <p class="name text-lg font-semibold cursor-pointer" @click="openItem">{{ props.title }}</p>
      </div>
  
      <div class="flex">
        <img 
          v-if="extraButton"
          class="h-5 cursor-pointer transition-transform duration-300 mr-4"
          :src="extraButton"
          alt="extraFunction"
          @click="extraFunction ? extraFunction() : null"
        />
        <img 
          class="h-5 cursor-pointer transition-transform duration-300"
          :class="isOpen ? 'rotate-180' : 'rotate-0'"
          src="../../assets/icons/openClose.png"
          alt="openOrClose"
          @click="openItem()"
        />
      </div>
    </div>
  
    <div class="all-data mt-4" v-show="isOpen">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    icon: String,
    iconFunction: Function,
    title: { type: String, required: true },
    width: String,
    extraButton: String,
    extraFunction: Function,
  });
  
  const isOpen = ref(false);
  
  const openItem = () => {
    isOpen.value = !isOpen.value;
  };
  </script>
  