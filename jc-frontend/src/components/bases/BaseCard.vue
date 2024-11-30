<template>
    <div
      :class="[
        'rounded shadow p-4',
        bgColor,
        textColor,
        height,
        width,
        customClasses
      ]"
    >
      <slot></slot>
    </div>
  </template>
  
  <script setup>

  defineProps({
    bgColor: { type: String, default: 'bg-white' }, 
    textColor: { type: String, default: 'text-gray-800' }, 
    height: { type: String, default: 'h-64' }, 
    width: { type: String, default: 'w-1/2' }, 
    customClasses: { type: String, default: '' }, 
  });
  </script>
  