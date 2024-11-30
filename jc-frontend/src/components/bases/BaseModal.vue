<template>
  <dialog ref="dialog" class="modal modal-middle" @click.self="closeModal">
    <div class="modal-box bg-background min-w-4/6 max-w-4xl">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-6 top-6" @click.self="closeModal">✕</button>
      </form>
      <header class="text-xl font-bold text-default">
        <slot name="title">Default Title</slot>
      </header>
      <main class="py-4">
        <slot name="content">Default Content</slot>
      </main>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  onClose: { type: Function, required: true }
})

const dialog = ref(null);

const openModal = () => {
  dialog.value?.showModal();
};

const closeModal = () => {
  props.onClose();
  dialog.value?.close()
};

defineExpose({ openModal, closeModal });
</script>
