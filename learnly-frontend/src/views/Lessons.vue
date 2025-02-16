<script setup>
    import ScoreNav from "@/components/ScoreNav.vue"
    import { useRoute } from "vue-router"

    const route = useRoute().path

    console.log("route path from Lessons", route)
</script>

<template>
    <ScoreNav />
</template>