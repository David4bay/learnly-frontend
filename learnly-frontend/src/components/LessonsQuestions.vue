<script setup>
    import { onMounted, reactive, defineProps } from "vue"
    import axios from "axios"

    const state = reactive({
        mcquestions: {}
    })

    defineProps({
        score: Number
    })

    onMounted(async () => {
        try {
        const response = await axios.get("http://localhost:3000/mcquestions")
        state.mcquestions = response.data
        } catch (error) {
            console.error("could not fetch multiple choice questions")
        }
    })
</script>
<template>
<section>
    <h3>Question {{ state.mcquestions.id }}</h3>
    <p>{{ state.mcquestions.question }}</p>
    <ul>
        <li v-for="option in state.mcquestions.options" :key="option">{{ option }}</li>
    </ul>
</section>
</template>