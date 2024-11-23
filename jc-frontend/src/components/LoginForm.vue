<template>
    <form @submit.prevent>
        <div class="input-login">
            <label for="email">{{ $message.login.email }}</label>
            <input type="text" id="email" :placeholder="$message.login.email" v-model="email" >
        </div>
        <div class="input-login">
            <label for="password">{{ $message.login.password }}</label>
            <input type="password" id="password" :placeholder="$message.login.password" v-model="password">    
        </div>
        <button class="enter" @click="login"> {{ $message.login.enter }}</button>
    </form>

    <p v-if="errorMessage">{{ errorMessage }}</p>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginService from "../service/LoginService";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const router = useRouter();

const login = async () => {
  try {
    const data = await LoginService.login(email.value, password.value);

    localStorage.setItem("token", data.token);
    localStorage.setItem("coachId", data.coachId);

    router.push("/");
  } catch (error) {
    console.error(error);
    errorMessage.value = "Email ou Senha inválidos";
  }
};
</script>