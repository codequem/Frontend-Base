<template>
    <div class="flex flex-col items-center gap-4">
        <!-- 加载状态 -->
        <div v-if="type === 'loading'" class="flex flex-col items-center gap-2">
            <span class="loading loading-spinner loading-lg text-primary"></span>
            <p class="text-base-content/70">{{ message || '加载中...' }}</p>
        </div>

        <!-- 成功状态 -->
        <div v-else-if="type === 'success'" class="alert alert-success shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ message }}</span>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="type === 'error'" class="alert alert-error shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ message }}</span>
        </div>

        <!-- 信息状态 -->
        <div v-else class="alert alert-info shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="stroke-current shrink-0 h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ message }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    type: 'loading' | 'success' | 'error' | 'info'
    message?: string
}>()
</script>