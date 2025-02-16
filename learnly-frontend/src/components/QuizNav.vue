<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"

const currentLesson = ref(1.1)
const timer = ref(60) // 60 seconds
const timerDisplay = ref("01:00")
const questionTitle = ref("Match the correct elements")
const showQuestion = ref(false)

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const startTimer = () => {
    const interval = setInterval(() => {
        if (timer.value > 0) {
            timer.value--
            timerDisplay.value = formatTime(timer.value)
        } else {
            clearInterval(interval)
            // Emit time's up event
        }
    }, 1000)
}

const toggleQuestion = () => {
    showQuestion.value = !showQuestion.value
}

onMounted(() => {
    startTimer()
})
</script>

<style scoped>
nav {
    padding: 20px;
}

ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
}

.back-button {
    color: #480099;
    text-decoration: none;
    font-weight: bold;
}

.question-icon {
    cursor: pointer;
    color: #480099;
    font-weight: bold;
}

.progress-container {
    display: flex;
    gap: 10px;
}

progress {
    width: 50px;
    height: 8px;
}

progress::-webkit-progress-value {
    background-color: #480099;
}

progress::-webkit-progress-bar {
    background-color: #F3E3F4;
    border-radius: 4px;
}

.timer {
    font-weight: bold;
    color: #480099;
}

.question-tooltip {
    position: absolute;
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 10;
}
</style>

<template>
    <nav>
        <ul>
            <RouterLink to="/" class="back-button">←</RouterLink>
            <span>Course Preview</span>
            <span class="question-icon" @click="toggleQuestion">?</span>
        </ul>
        <div v-if="showQuestion" class="question-tooltip">
            {{ questionTitle }}
        </div>
        <ul>
            <span>Lesson {{ currentLesson }}</span>
            <div class="progress-container">
                <progress max="100" value="0"></progress>
                <progress max="100" value="0"></progress>
                <progress max="100" value="0"></progress>
                <progress max="100" value="0"></progress>
                <progress max="100" value="0"></progress>
            </div>
        </ul>
        <ul>
            <span class="timer">Timer {{ timerDisplay }}</span>
        </ul>
    </nav>
</template>