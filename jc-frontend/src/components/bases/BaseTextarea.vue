<template>
    <div class="flex flex-col w-full">
      <label v-if="label" :for="id" class="text-md text-zinc-50">{{ label }}</label>
      <textarea
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="[
          'textarea textarea-bordered w-full py-2 px-4 mt-1 rounded-md border focus:ring-2',
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-indigo-500',
          'disabled:cursor-auto disabled:text-primary disabled:text-base'
        ]"
        :rows="rows"
        :disabled="disabled"
      ></textarea>
      <p v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    modelValue: String,
    id: { type: String, required: true },
    label: String,
    placeholder: String,
    error: String,
    rows: { type: Number, default: 4 }, // Define o número de linhas padrão do textarea
    width: { type: String, default: "w-full" },
    disabled: {type: Boolean, default: false}
  });
  
  defineEmits(["update:modelValue"]);
  </script>