<template>
  <div class="flex flex-col w-full">
    <label v-if="label" :for="id" class="text-md text-zinc-50">{{ label }}</label>
    <select
      class="select select-bordered w-full py-2 px-4 mt-1 rounded-md border-gray-400 focus:ring-2 focus:ring-indigo-500"
      :class="{'border-red-500 focus:ring-red-500': error}" 
      :value="modelValue" 
      @change="$emit('update:modelValue', $event.target.value)">
      <option v-if="default" value="" disabled selected>{{ default }}</option>
      <option v-for="(item, index) in list" :key="index" :value="item[valueField]">
        {{ formatOption(item) }}
      </option>
    </select>
    <p v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: [String, Number],
  id: { type: String, required: true },
  label: String,
  default: String,
  list: { type: Array, required: true },
  valueField: { type: String, default: 'id' },
  labelFormatter: {
    type: Function,
    default: (item) => item.name
  },
  error: String,
})

defineEmits(["update:modelValue"])

const formatOption = (item) => props.labelFormatter(item);
</script>
