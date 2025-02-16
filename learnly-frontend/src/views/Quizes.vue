<script setup>
import { useRoute } from "vue-router"
import QuizNav from "@/components/QuizNav.vue"
import QuizBody from "@/components/QuizBody.vue"
const route = useRoute().path

console.log("route path from Quizes", route)
</script>

<style scoped>

</style>

<template>
    <QuizNav />
    <QuizBody />
</template>