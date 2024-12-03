<template>
    <div class="max-lg:max-screen lg:w-screen-limit px-4">
        <header
        class="flex flex-row justify-between text-2xl font-semibold my-6  text-primary border-b-2 border-secondary lg:w-screen-">
            {{ title }}

            <div class="flex h-6">
                <slot name="header"></slot>
            </div>
        </header>
    
        <body>
            <slot name="body"></slot>
        </body>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String
    })
</script>