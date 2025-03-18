<template>
    <div class="relative mx-auto w-full">

      <div class="overflow-hidden rounded-lg">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
              <slot></slot>
        </div>
      </div>
  
      <!-- Botões de navegação -->
      <button
        v-if="currentIndex > 0"
        @click="prevSlide"
        class="absolute left-0 top-1/2 transform -translate-y-1/2 text-white px-3 py-2 rounded-l-md"
      >
        &#10094;
      </button>
      <button
      v-if="currentIndex < maxIndex"
        @click="nextSlide"
        class="absolute right-0 top-1/2 transform -translate-y-1/2 text-white px-3 py-2 rounded-r-md"
      >
        &#10095;
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const props = defineProps({
    length: {
      type: Number,
      required: true,
    },

    count: {
      type: Number,
      default: 1
    }

  });
  
  const currentIndex = ref(0);
  const maxIndex = computed(() => Math.ceil(props.length / props.count)- 1);


  const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= (1/props.count);
  }
};

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value += (1/props.count);
  }
};
  </script>
  