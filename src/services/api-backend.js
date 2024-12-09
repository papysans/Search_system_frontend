import axios from 'axios'

// 创建axios实例
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
api.interceptors.response.use(
    response => {
        // 直接返回响应数据
        return response.data
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 未授权，清除token并跳转到登录页
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                    break
                case 403:
                    console.error('没有权限访问该资源')
                    break
                case 404:
                    console.error('请求的资源不存在')
                    break
                case 500:
                    console.error('服务器错误')
                    break
                default:
                    console.error('发生错误:', error.response.data.message)
            }
        } else if (error.request) {
            console.error('未收到响应:', error.request)
        } else {
            console.error('请求配置错误:', error.message)
        }
        return Promise.reject(error)
    }
)

/**
 * 用户登录
 * @param {string} studentId - 学号
 * @param {string} password - 密码
 * @returns {Promise} 返回登录结果和用户信息
 */
export async function login(studentId, password) {
    try {
        const response = await api.post('/auth/login', {
            studentId,
            password
        })
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
        }
        
        return response.data
    } catch (error) {
        console.error('登录失败:', error)
        throw error
    }
}

/**
 * 获取用户信息
 * @param {string} userId - 用户ID
 * @returns {Promise} 返回用户详细信息
 */
export async function getUserInfo(userId) {
    try {
        const response = await api.get(`/users/${userId}`)
        return response.data
    } catch (error) {
        console.error('获取用户信息失败:', error)
        throw error
    }
}

/**
 * 搜索项目
 * @param {Object} params - 搜索参数
 * @param {string} [params.query=''] - 搜索关键词
 * @param {string} [params.major=''] - 专业筛选
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pageSize=15] - 每页数量
 * @returns {Promise} 返回项目列表和分页信息
 */
export async function searchProjects({ query = '', major = '', page = 1, pageSize = 15 }) {
    try {
        // 验证pageSize不超过限制
        if (pageSize > 50) {
            pageSize = 50
        }
        
        const response = await api.get('/projects/search', {
            params: {
                query,
                major,
                page,
                pageSize
            }
        })
        
        return response.data
    } catch (error) {
        console.error('搜索项目失败:', error)
        throw error
    }
}

/**
 * 获取专业列表
 * @returns {Promise} 返回所有可选专业
 */
export async function getMajors() {
    try {
        const response = await api.get('/majors')
        return response.data
    } catch (error) {
        console.error('获取专业列表失败:', error)
        throw error
    }
}

/**
 * 获取项目详情
 * @param {number} projectId - 项目ID
 * @returns {Promise} 返回项目详细信息
 */
export async function getProjectDetail(projectId) {
    try {
        const response = await api.get(`/projects/${projectId}`)
        return response.data
    } catch (error) {
        console.error('获取项目详情失败:', error)
        throw error
    }
}

/**
 * 更新用户信息
 * @param {string} userId - 用户ID
 * @param {Object} userData - 用户数据
 * @returns {Promise} 返回更新后的用户信息
 */
export async function updateUserInfo(userId, userData) {
    try {
        const response = await api.put(`/users/${userId}`, userData)
        return response.data
    } catch (error) {
        console.error('更新用户信息失败:', error)
        throw error
    }
}

export default api
