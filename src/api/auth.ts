// src/api/auth.ts
import request from '@/utils/request'

// 获取 GitHub 授权 URL
export const getGithubLoginUrl = () => {
    return request.get('/auth/oauth/github/login_url')
}

// 查询登录状态
export const getLoginStatus = (messageId: string) => {
    return request.get('/auth/oauth/github/login/status', {
        params: { message_id: messageId }
    })
}