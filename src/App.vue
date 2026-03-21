<script setup lang="ts">
    import { onMounted } from 'vue'
    import { themeChange } from 'theme-change'

    onMounted(() => {
        themeChange(false)
    })
</script>

<template>
    <router-view />
</template>

<style scoped>

</style>
