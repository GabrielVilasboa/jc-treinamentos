<script setup >
    import Sidebar from './Sidebar.vue';
    import Navbar from './Navbar.vue';
</script>
    
<template>
        <div class="layout">

            <Sidebar/>
            <Navbar/>
            <div class="content">
                <slot></slot>
            </div>
        </div>
</template>

<style scoped>

    .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100vw;
        overflow-x: hidden;
    }

    .content {
        margin-left: 50px;
        margin-top: 30px; 
        padding: var(--spacing-small);
    }

    .layout {
        padding-left: 48px; /* ajuste para sidebar */
        padding-top: 48px; /* ajuste para navbar */
        box-sizing: border-box;
    }
</style>