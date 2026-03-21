<!-- src/views/Login.vue -->
<template>
    <AuthLayout>
        <!-- 科技感背景装饰 -->
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

            <!-- 漂浮的粒子效果 -->
            <div class="absolute inset-0">
                <div v-for="i in 20" :key="i" class="particle" :style="{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${5 + Math.random() * 10}s`
                }"></div>
            </div>
        </div>

        <!-- 主题切换按钮 -->
        <div class="fixed top-6 right-6 z-20">
            <ThemeSwitcher />
        </div>

        <div
            class="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-white/20 transition-all duration-300 hover:shadow-primary/20">
            <div class="card-body items-center text-center p-8 md:p-10">
                <!-- Logo 或图标 -->
                <div class="mb-4">
                    <div
                        class="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>

                <h1
                    class="card-title text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    智能年报解析系统
                </h1>
                <p class="text-base-content/70 mt-2">欢迎回来，请登录以继续</p>

                <button
                    class="btn w-full gap-3 mt-6 transition-all duration-300 bg-neutral hover:bg-gradient-to-r hover:from-primary hover:to-secondary text-white border-none"
                    @click="handleGithubLogin">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub 登录
                </button>

                <div class="text-xs text-base-content/40 mt-6">
                    首次登录将自动创建账号
                </div>

                <!-- 装饰性数据流线条 -->
                <div
                    class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30">
                </div>
            </div>
        </div>
    </AuthLayout>
</template>

<script setup lang="ts">
import { getGithubLoginUrl } from '@/api/auth'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'

const handleGithubLogin = async () => {
    try {
        const res = await getGithubLoginUrl()
        if (res.code === 'SUCCESS') {
            window.location.href = res.data
        } else {
            console.error('获取授权地址失败', res.msg)
        }
    } catch (error) {
        console.error('请求失败', error)
    }
}
</script>

<style scoped>
/* 粒子动画 */
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