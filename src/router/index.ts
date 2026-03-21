import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 定义路由
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue') // 后面会创建这个组件
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/github-login-success',
        name: 'GithubLoginSuccess',
        component: () => import('@/views/GithubLoginSuccess.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;