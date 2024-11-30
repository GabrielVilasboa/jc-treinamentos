<template>
    <div class="sidebar bg-secondary" >
        <router-link to="/trainees" class="router-button "><img class="router-image" src="../../assets/icons/trainees.png" alt="trainees Page"></router-link>
        <router-link to="/" class="router-button"><img class="router-image" src="../../assets/icons/finance.png" alt="trainees Page"></router-link>
    </div>
</template>

<style scoped>

.sidebar {
    padding-top: 60px;
    position: fixed; 
    top: 0;
    left: 0; 
    height: 100vh; 
    width: 60px; 
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.959);
    
}

.router-button{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    transition: box-shadow 0.3s ease-in-out, background-color 0.3s ease;
}

.router-image{
    width: 45px;
    height: 45px;
    margin: 12px 0 12px 0; 
}

.router-button:hover{
    background-color: #5e5fa8; 
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
}
</style>