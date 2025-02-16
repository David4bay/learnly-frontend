<script setup>
import { ref } from "vue"
import ScoreNav from "@/components/ScoreNav.vue"
import LessonsQuestions from "@/components/LessonsQuestions.vue"

const score = ref(0)
const goal = ref(30)
</script>

<template>
    <ScoreNav :score="score" :goal="goal" />
    <LessonsQuestions v-model:score="score" :goal="goal" />
</template>