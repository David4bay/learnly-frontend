<script setup>
    import { RouterLink } from "vue-router"
</script>

<style scoped>
    .lessons__link {
        font-family: Inter, noto-sans, sans-serif;
        font-size: clamp(1vw, 18px, 28px);
        text-decoration: none;
        padding: 20px;
        background-color: #4D0094;
        letter-spacing: 2px;
        color: #fff;
        border-radius: 8px;
        transition: transform 400ms ease;
        
        &:hover {
            cursor: pointer;
            transform: translateY(4px);
        }
    }
</style>

<template>
    <RouterLink class="lessons__link" to="/lessons">Lessons</RouterLink>
</template>