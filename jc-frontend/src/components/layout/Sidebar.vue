<template>
    <div 
    class="pt-ultra-large fixed top-0 left-0 h-screen w-ultra-large shadow bg-secondary">
            <!-- MainDashboard -->
            <router-link 
            to="/" 
            class="router-button flex flex-col items-center w-ultra-large hover:bg-secondaryHover hover:shadow-lg tooltip tooltip-right"

            :class="{
                'bg-secondaryHover shadow-lg': route.path === '/',
                'bg-secondary': route.path !== '/'
            }"
            data-tip="Painel"
            >
            <img 
                class="w-large-xxx h-large-xxx my-3" 
                src="../../assets/icons/finance.png"
                alt="trainees Page">
        </router-link>
        <!-- TraineeDashboard -->
        <router-link 
            to="/trainees" 
            class="router-button flex flex-col items-center w-ultra-large hover:bg-secondaryHover hover:shadow-lg tooltip tooltip-right" 
            :class="{
                'bg-secondaryHover shadow-lg': route.path === '/trainees',
                'bg-secondary': route.path !== '/trainees'
            }"
            data-tip="Alunos"
            >
            <img 
                class="w-large-xxx h-large-xxx my-3" 
                src="../../assets/icons/trainees.png" 
                alt="trainees Page">
        </router-link>
        <!-- PaymentsPlanDashboard -->
        <router-link 
            to="/payments-plan" 
            class="router-button flex flex-col items-center w-ultra-large hover:bg-secondaryHover hover:shadow-lg tooltip tooltip-right" 
            :class="{
                'bg-secondaryHover shadow-lg': route.path === '/payments-plan',
                'bg-secondary': route.path !== '/payments-plan'
            }"
            data-tip="Planos Pagamentos"
            >
            <img 
                class="w-large-xxx h-large-xxx my-3" 
                src="../../assets/icons/paymentsPlan.png" 
                alt="payments plan page">
        </router-link>
        <!-- PaymentsDashboard -->
        <router-link 
            to="/payments" 
            class="router-button flex flex-col items-center w-ultra-large hover:bg-secondaryHover hover:shadow-lg tooltip tooltip-right" 
            :class="{
                'bg-secondaryHover shadow-lg': route.path === '/payments',
                'bg-secondary': route.path !== '/payments'
            }"
            data-tip="Pagamentos"
            >
            <img 
                class="w-large-xxx h-large-xxx my-3" 
                src="../../assets/icons/payments.png" 
                alt="payments page">
        </router-link>
        <!--Sessions and schedules -->
        <router-link 
            to="/sessions" 
            class="router-button flex flex-col items-center w-ultra-large hover:bg-secondaryHover hover:shadow-lg tooltip tooltip-right" 
            :class="{
                'bg-secondaryHover shadow-lg': route.path === '/sessions',
                'bg-secondary': route.path !== '/sessions'
            }"
            data-tip="Sessões"
            >
            <img 
                class="w-large-xxx h-large-xxx my-3" 
                src="../../assets/icons/schedule.png" 
                alt="payments page">
        </router-link>
    </div>
</template>

<style scoped>
.router-button{
    transition: box-shadow 0.6s ease-in-out, background-color 0.6s ease;
}
</style>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
