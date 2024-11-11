<template>
    <form @submit.prevent>
        <div class="input-login">
            <label for="email">{{ $message.login.email }}</label>
            <input type="email" id="email" :placeholder="$message.login.email" v-model="email" >
        </div>
        <div class="input-login">
            <label for="password">{{ $message.login.password }}</label>
            <input type="password" id="password" :placeholder="$message.login.password" v-model="password">    
        </div>
        <button class="enter" @click="login"> {{ $message.login.enter }}</button>
    </form>

    <p v-if="errorMessage">{{ errorMessage }}</p>
</template>

<script>

    import axios from 'axios';

    export default {
        data() {
            return {
                email: "",
                password: "",
                errorMessage: ""
            }
        },
        methods: {
            async login(){
                try{

                    const url = import.meta.env.VITE_API_URL + "login"

                    const response = await axios.post(url, {
                        email: this.email,
                        password: this.password
                    })
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('coachId', response.data.coachId)

                    this.$router.push('/')
                }catch(e){
                    console.error(e.message)
                    this.errorMessage = "Email ou Senha Invalidos"
                }
            }
        },
    }
</script>