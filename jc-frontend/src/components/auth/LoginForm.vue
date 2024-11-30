<template>
  <form @submit.prevent="login" class="flex flex-col items-center gap-4 min-w-full">
    <BaseInput
      v-model="coach.email"
      :label="$message.login.email"
      :placeholder="$message.login.email"
      :error="errors.email"
      id="email"
    />
    <BaseInput
      v-model="coach.password"
      type="password"
      :label="$message.login.password"
      :placeholder="$message.login.password"
      :error="errors.password"
      id="password"
    />
    <button
      type="submit"
      class="btn btn-primary w-full py-2 mt-4 text-white font-bold transition-shadow duration-300 hover:shadow-lg active:shadow-sm"
    >
      {{ $message.login.enter }}
    </button>
  </form>

  <p v-if="errors.valid" class="text-red-500 text-center mt-4">
    {{ errors.valid }}
  </p>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginService from "../../service/LoginService";
import BaseInput from "../bases/BaseInput.vue";

// Reactive state
const coach = ref({ email: "", password: "" });
const errors = ref({});

// Utilities
const router = useRouter();
const requiredFields = ["email", "password"];

// Functions
const clearErrors = () => {
  errors.value = {};
};

const validateFields = () => {
  requiredFields.forEach((field) => {
    if (!coach.value[field]) {
      errors.value[field] = "Por favor, insira um valor neste campo.";
    }
  });

  return Object.keys(errors.value).length === 0;
};

const login = async () => {
  clearErrors();

  if (!validateFields()) return;

  try {
    const data = await LoginService.login(coach.value);

    localStorage.setItem("token", data.token);
    localStorage.setItem("coachId", data.coachId);

    router.push("/");
  } catch (error) {
    console.error(error);
    errors.value.valid = "Email ou Senha inválidos";
  }
};
</script>
