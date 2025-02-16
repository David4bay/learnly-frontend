<script setup>
    import { useRoute } from "vue-router"
    import { ref } from "vue"
    import ScoreNav from "@/components/ScoreNav.vue"
    import LessonsQuestions from "@/components/LessonsQuestions.vue"

    const route = useRoute().path

    console.log("route path from Lessons", route)
</script>

<template>
    <ScoreNav />
    <LessonsQuestions />
</template>