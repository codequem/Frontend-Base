<!-- src/views/GithubLoginSuccess.vue -->
<template>
    <AuthLayout>
        <!-- 科技感背景装饰（与登录页面一致） -->
        <div class="fixed inset-0 -z-10 overflow-hidden">
            <!-- 动态网格线 -->
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,100,255,0.1)_1px,_transparent_1px)] bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
            </div>

            <!-- 光晕效果 -->
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse">
            </div>
            <div
                class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-1000">
            </div>

            <!-- 漂浮粒子效果 -->
            <div class="absolute inset-0">
                <div v-for="i in 20" :key="i" class="particle" :style="{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${5 + Math.random() * 10}s`,
                }"></div>
            </div>
        </div>

        <!-- 主题切换按钮（可选，与登录页面保持一致） -->
        <div class="fixed top-6 right-6 z-20">
            <ThemeSwitcher />
        </div>

        <!-- 毛玻璃卡片 -->
        <div
            class="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-white/20 transition-all duration-300 min-w-[320px] max-w-md">
            <div class="card-body items-center text-center p-8 md:p-10 gap-6">
                <!-- 根据状态显示不同内容 -->
                <template v-if="status === 'pending'">
                    <!-- 动态加载动画 -->
                    <div class="relative">
                        <div class="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin">
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <svg class="w-8 h-8 text-primary animate-pulse" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v10l12 6" />
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-xl font-semibold">正在验证登录</h3>
                    <p class="text-base-content/70">请稍候，系统正在处理您的请求...</p>
                </template>

                <template v-else-if="status === 'success'">
                    <!-- 成功对号动画 -->
                    <div class="relative">
                        <div
                            class="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-xl font-semibold text-green-500">登录成功！</h3>
                    <p class="text-base-content/70">正在跳转至首页，请稍候...</p>
                </template>

                <template v-else-if="status === 'error'">
                    <!-- 错误叉号 -->
                    <div class="relative">
                        <div class="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                            <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-xl font-semibold text-red-500">登录失败</h3>
                    <p class="text-base-content/70">授权过程中出现问题，请重试。</p>
                    <button class="btn btn-outline btn-primary mt-4" @click="goToLogin">返回登录</button>
                </template>
            </div>
        </div>
    </AuthLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getLoginStatus } from '@/api/auth'
import { useUserStore } from '@/stores/user'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const status = ref<'pending' | 'success' | 'error'>('pending')

const pollLoginStatus = (messageId: string) => {
    let interval: number | null = null
    let attempts = 0
    const maxAttempts = 30

    const check = async () => {
        attempts++
        try {
            const res = await getLoginStatus(messageId)
            if (res.code === 'SUCCESS') {
                const { status: loginStatus, token } = res.data
                if (loginStatus === 'success') {
                    userStore.setTokens(token.accessToken, token.refreshToken)
                    status.value = 'success'
                    if (interval) clearInterval(interval)
                    setTimeout(() => router.push('/'), 1000)
                } else if (loginStatus === 'failed') {
                    status.value = 'error'
                    if (interval) clearInterval(interval)
                }
            } else {
                status.value = 'error'
                if (interval) clearInterval(interval)
            }
        } catch (error) {
            console.error('轮询失败', error)
            status.value = 'error'
            if (interval) clearInterval(interval)
        }

        if (attempts >= maxAttempts) {
            if (interval) clearInterval(interval)
            if (status.value === 'pending') status.value = 'error'
        }
    }

    check()
    interval = window.setInterval(check, 2000)
}

onMounted(() => {
    const messageId = route.query.message_id as string
    if (messageId) {
        pollLoginStatus(messageId)
    } else {
        status.value = 'error'
    }
})

const goToLogin = () => {
    router.push('/login')
}
</script>

<style scoped>
/* 粒子动画（与登录页面一致） */
.particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(100, 150, 255, 0.6);
    border-radius: 50%;
    filter: blur(1px);
    animation: float linear infinite;
}

@keyframes float {
    0% {
        transform: translateY(100vh) scale(1);
        opacity: 0;
    }

    10% {
        opacity: 0.8;
    }

    90% {
        opacity: 0.8;
    }

    100% {
        transform: translateY(-20vh) scale(0.5);
        opacity: 0;
    }
}

/* 卡片进入动画 */
.card {
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>