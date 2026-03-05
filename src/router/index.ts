import { createRouter, createWebHistory } from 'vue-router'

// 定义路由
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue') // 后面会创建这个组件
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;