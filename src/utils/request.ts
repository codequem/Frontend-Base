import axios from 'axios'
import { useUserStore } from '@/stores/user'

const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 从环境变量读取，默认 /api
    timeout: 10000
})

// 请求拦截器（可选）
request.interceptors.request.use(
    config => {
        const userStore = useUserStore()
        if (userStore.accessToken) {
            config.headers.Authorization = `Bearer ${userStore.accessToken}`
        }
        return config
    },
    error => Promise.reject(error)
)

// 响应拦截器（可选）
request.interceptors.response.use(
    response => response.data, // 直接返回 data，简化使用
    error => Promise.reject(error)
)

export default request