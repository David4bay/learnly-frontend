<script setup>
    import { onMounted, reactive, defineProps, computed, ref } from "vue"
    import axios from "axios"

    const state = reactive({
        mcquestions: {}
    })

    defineProps({
        score: Number
    })

    let currentQuestion = ref(0)

    let next = computed(() => {
        currentQuestion >= state.mcquestions.length ? console.log("done") : currentQuestion + 1
    })

    onMounted(async () => {
        try {
        const response = await axios.get("http://localhost:3000/mcquestions")
        state.mcquestions = response.data
        } catch (error) {
            console.error("could not fetch multiple choice questions")
        }
    })
    console.log(state)
</script>
<style scoped>
    section {
        margin-left: 15px;
    }

    ul {
        counter-reset: alpha;
    }

    div {
        margin-top: 15px;
    }

    li::before {
        counter-increment: alpha;
        content: counter(alpha, upper-alpha) ".   ";
    }

    li {
        list-style: none;
        margin-top: 10px;
        padding: 20px;
        border: 3px solid #F7F7F7;
        border-radius: 8px;

    }
</style>
<template>
<section v-if="state.mcquestions.length >= 0">
    <h3>Question {{ currentQuestion + 1 }}</h3>
    <div>
        <p>{{ state.mcquestions[currentQuestion].question }}</p>
        <ul>
            <li v-for="option in state.mcquestions[currentQuestion].options" :key="option">{{ option }}</li>
        </ul>
    </div>
</section>
</template>