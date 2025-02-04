<template>
    <div class="flex flex-col w-full">
        <label v-if="label" :for="id" class="text-md text-zinc-50">{{ label }}</label>
        <input 
        :type="type" 
        :id="id" 
        :placeholder="placeholder"
        :value="formattedValue"
        :autocomplete="autocomplete"
        :min="min"
        :max="max"
        :step="step"
        @input="handleInput"
        :class="[ 
            'input input-bordered w-full py-2 px-4 mt-1 rounded-md border focus:ring-2', 
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-indigo-500' 
        ]">
        <p v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</p>
    </div>
</template>

<script setup>

import { computed, watch, ref } from 'vue'

const props = defineProps({
    modelValue: [String, Number, Date],
    id: { type: String, required: true },
    type: { type: String, default: 'text' },
    label: String,
    placeholder: String,
    error: String,
    autocomplete: { type: String, default: 'off' },
    width: { type: String, default: "w-full" },
    format: { type: String, default: '' },
    min: Number,
    max: Number,
    step: { type: Number },
})

const emit = defineEmits(['update:modelValue'])

const formatPhone = (value) => {
    return value.replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
}

const formatCpf = (value) => {
    return value.replace(/\D/g, '')
        .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
        .slice(0, 14);
}

const formatName = (value) => {
    return value
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
}


const handleInput = (event) => {
    let value = event.target.value;

    if (props.format === 'phone') {
        value = formatPhone(value);
    } else if (props.format === 'cpf') {
        value = formatCpf(value);
    } else if (props.format === 'name') {
        value = formatName(value);
    }

    emit('update:modelValue', value);
}

// Computed para controlar o valor formatado exibido
const formattedValue = computed(() => {
    let value = props.modelValue || '';

    if (props.format === 'phone') {
        return formatPhone(value);
    } else if (props.format === 'cpf') {
        return formatCpf(value);
    } else if (props.format === 'name') {
        return formatName(value);
    } 
    return value;
})

</script>
