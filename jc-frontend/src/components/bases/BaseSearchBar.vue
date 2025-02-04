<template>
    <div :class="['flex items-center mr-4', containerClass]">
      <input
        autocomplete="off"
        type="text"
        :placeholder="placeholder"
        id="search"
        v-model="localValue"
        @input="handleInput"
        class="input bg-transparent  border-0 focus:outline-none "
      />
      <label for="search">
          <img
            src="../../assets/icons/search.png"
            v-if="hasSearchButton"
            class="cursor-pointer icons flex h-6"
          >
          </img>
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  

  const props = defineProps({
    modelValue: String, 
    placeholder: { type: String, default: "Search..." },
    hasSearchButton: { type: Boolean, default: true }, 
    containerClass: { type: String, default: "" }, 
  });
  

  const emit = defineEmits(["update:modelValue"]);
  

  const localValue = ref(props.modelValue || "");
  
  watch(
    () => props.modelValue,
    (newValue) => {
      localValue.value = newValue;
    }
  );

  const handleInput = () => {
    emit("update:modelValue", localValue.value);
  };


  </script>
  