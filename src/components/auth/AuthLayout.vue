<template>
    <div class="min-h-screen bg-linear-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
        <div class="w-full max-w-md animate-fade-in">
            <slot />
        </div>
    </div>
</template>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}
</style>