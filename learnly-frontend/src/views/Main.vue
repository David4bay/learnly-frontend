<script setup>
import Lessons from '@/components/Lessons.vue'
import Quizes from '@/components/Quizes.vue'
import QuizSlot from '@/components/QuizSlot.vue'
</script>
<style scoped>
    .main__content {
        display: flex;
        flex-direction: row;
        height: 100vh;
        justify-content: center;
        align-items: center;
    }
</style>
<template>
    <main class="main__content">
        <QuizSlot quizType="lessons"/>
        <QuizSlot quizType="quizes" />
        <Lessons /> 
        <Quizes />
    </main>
</template>