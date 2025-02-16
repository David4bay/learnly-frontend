<script setup>
    import { ref, reactive } from "vue"

    const goal = ref(30)

    const points = reactive({
        current: 0
    })
</script>
<style scoped>
    nav {
        margin-top: 125px;
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
        margin-bottom: 50px;
    }

    .points__goal__title, .current__goal__title {
        text-transform: capitalize;
    }

    .points__goal__title {
        font-weight: 600;
    }

    .points__goal__container {
    }
</style>
<template>
    <nav>
        <ul>
            <div class="points__goal__container">
                <div class="points__goal"><span class="points__goal__title">goal:  {{ goal }} points</span></div>
            </div>
            <div class="current__goal__container">
                <div><span class="current__goal__title">current points:</span> {{ points.current }}</div>
            </div>
        </ul>
    </nav>
</template>