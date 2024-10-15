<template>
    <div class="card">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .card{
        background-color: var(--primary-color);
        padding: var(--spacing-medium);
        height: 250px;
        min-width: 400px;
        width: 40%;
        border-radius: 5px;
    }

    .content{
        color: var(--dark-text-color);
    }
</style>