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
</template>

<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
            }
        },
        methods: {
            // check login data in de db and return a boolean  
            checkLogin(){
                return true
            },

            login(){
                if(this.checkLogin()){
                    this.$router.push({ name: "main"})
                }
            }
        },
    }
</script>