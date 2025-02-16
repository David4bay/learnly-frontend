<script setup>
import { ref, defineProps } from "vue"
import { RouterLink } from "vue-router"

defineProps({
    score: Number,
    goal: Number
})
</script>
<style scoped>
    nav {
        margin-top: 125px;
        position: relative;
    }

    .back__button {
        display: flex;
        justify-content: center;
        align-items: center;
        top: -80px;
        left: 20px;
        position: absolute;
        background-color: #F3E3F4;
        padding: 10px;
        border-radius: 50%;
        transition: transform 400ms ease;

        &:hover {
            transform: translateX(8px);
        }
    }

    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #4D0094;
        color: #fff;
        margin-left: 15px;
        padding-left: 25px;
        margin-right: 15px;
        padding-right: 25px;
        height: 70px;
        border-radius: 8px;
        margin-bottom: 30px;
    }

    .points__goal__title, .current__goal__title {
        text-transform: capitalize;
    }

    .points__goal__title {
        font-weight: 600;
    }

</style>
<template>
    <nav>
        <RouterLink to="/" class="back__button">←</RouterLink>
        <ul>
            <div class="points__goal__container">
                <div class="points__goal">
                    <span class="points__goal__title">goal: {{ goal }} points</span>
                </div>
            </div>
            <div class="current__goal__container">
                <div>
                    <span class="current__goal__title">current points:</span> {{ score }}
                </div>
            </div>
        </ul>
    </nav>
</template>