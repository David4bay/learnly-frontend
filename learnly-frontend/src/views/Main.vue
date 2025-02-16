<script setup>
import { useRoute } from "vue-router"

const routePath = useRoute().path

console.log("route from main.vue", routePath)
</script>
<style scoped>
      .quiz__options {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 15px;
    }

    .link__style {
        font-family: Inter, noto-sans, sans-serif;
        font-size: clamp(1vw, 18px, 28px);
        text-decoration: none;
        text-align: center;
        padding: 20px;
        background-color: #4D0094;
        letter-spacing: 2px;
        color: #fff;
        border-radius: 8px;
        transition: transform 400ms ease;
        width: 125px;
        
        &:hover {
            cursor: pointer;
            transform: translateY(4px);
        }
    }
</style>
<template>
    <div v-if="routePath === '/'" class="quiz__options">
        <RouterLink to="/lessons" class="link__style">Lessons</RouterLink>
        <RouterLink to="/quizes" class="link__style">Quizes</RouterLink>
    </div>
</template>