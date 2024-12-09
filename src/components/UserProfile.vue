<template>
    <div class="user-profile">
        <div class="profile-header" @click="toggleProfile">
            <i class="user-icon">👤</i>
            <span class="user-name">{{ userInfo.name }}</span>
            <i class="arrow" :class="{ 'arrow-down': !isExpanded, 'arrow-up': isExpanded }">▼</i>
        </div>
        <div v-if="isExpanded" class="profile-content">
            <div class="info-item">
                <span class="label">学号：</span>
                <span class="value">{{ userInfo.id }}</span>
            </div>
            <div class="info-item">
                <span class="label">姓名：</span>
                <span class="value">{{ userInfo.name }}</span>
            </div>
            <div class="info-item">
                <span class="label">学院：</span>
                <span class="value">{{ userInfo.college }}</span>
            </div>
            <div class="info-item">
                <span class="label">专业：</span>
                <span class="value">{{ userInfo.major }}</span>
            </div>
            <div class="info-item">
                <span class="label">班级：</span>
                <span class="value">{{ userInfo.className }}</span>
            </div>
            <button class="logout-btn" @click="handleLogout">退出登录</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo } from '../services/api';


const props = defineProps({
    onLogout: {
        type: Function,
        required: true
    }
})

const router = useRouter()
const isExpanded = ref(false)
const userInfo = ref({
    id: '',
    name: '',
    college: '',
    major: '',
    className: ''
})

const toggleProfile = () => {
    isExpanded.value = !isExpanded.value
}

const handleLogout = () => {
    props.onLogout()
}

onMounted(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
        const user = JSON.parse(userData)
        // 这里可以根据实际存储的用户数据进行调整
        userInfo.value = {
            id: user.id || '',
            name: user.name || '',
            college: user.college || '计算机科学与工程学院',  // 示例默认值
            major: user.major || '软件工程',  // 示例默认值
            className: user.className || '软件2班'  // 示例默认值
        }
    }
})
</script>

<style scoped>
.user-profile {
    position: relative;
    min-width: 200px;
}

.profile-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: white;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.profile-header:hover {
    background-color: #f8f9fa;
}

.user-icon {
    font-size: 1.2rem;
}

.user-name {
    font-weight: 500;
    color: #2d3748;
}

.arrow {
    font-size: 0.8rem;
    transition: transform 0.2s;
    color: #718096;
    display: inline-block;
    line-height: 1;
    transform: rotate(-127deg);
    transform-origin: center center;
}

.arrow-up {
    transform: rotate(50deg);
    transform-origin: center center;
}

.profile-content {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    width: 240px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 100;
}

.info-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #edf2f7;
}

.info-item:last-of-type {
    border-bottom: none;
    margin-bottom: 16px;
}

.label {
    color: #718096;
    font-size: 0.9rem;
}

.value {
    color: #2d3748;
    font-weight: 500;
}

.logout-btn {
    width: 100%;
    padding: 8px;
    background-color: #f56565;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 8px;
}

.logout-btn:hover {
    background-color: #e53e3e;
}
</style>
