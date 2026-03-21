import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    // 状态
    const accessToken = ref<string | null>(null)
    const refreshToken = ref<string | null>(null)

    // 方法
    const setTokens = (access: string, refresh: string) => {
        accessToken.value = access
        refreshToken.value = refresh
        // 可选：保存到 localStorage，刷新页面后保持登录
        localStorage.setItem('accessToken', access)
        localStorage.setItem('refreshToken', refresh)
    }

    const clearTokens = () => {
        accessToken.value = null
        refreshToken.value = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    const loadTokensFromStorage = () => {
        const access = localStorage.getItem('accessToken')
        const refresh = localStorage.getItem('refreshToken')
        if (access && refresh) {
            accessToken.value = access
            refreshToken.value = refresh
        }
    }

    // 自动从 localStorage 恢复（在 store 初始化时调用）
    loadTokensFromStorage()

    return {
        accessToken,
        refreshToken,
        setTokens,
        clearTokens
    }
})