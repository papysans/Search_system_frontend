<template>
    <form @submit.prevent="handleLogin">
        <div class="user-box">
            <input v-model="studentId" type="text" required>
            <label>学号</label>
        </div>
        <div class="user-box">
            <input v-model="password" type="password" required>
            <label>密码</label>
        </div>
        <button type="submit">登录</button>
        <p v-if="error" class="error-message">{{ error }}</p>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { login as apiLogin } from '../services/api'

const emit = defineEmits(['login-success'])

const studentId = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
    try {
        const result = await apiLogin(studentId.value, password.value)
        if (result.success) {
            localStorage.setItem('user', JSON.stringify(result.user))
            emit('login-success')
        }
    } catch (err) {
        alert('用户名或密码错误')
    }
}
</script>

<style scoped>
.user-box {
    position: relative;
    margin-bottom: 30px;
}

.user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}

.user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}

.user-box input:focus~label,
.user-box input:valid~label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
}

button {
    position: relative;
    display: block;
    width: 100%;
    margin: 40px auto 0;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    letter-spacing: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
}

button:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
        0 0 25px #03e9f4,
        0 0 50px #03e9f4,
        0 0 100px #03e9f4;
}

.error-message {
    color: #ff4444;
    text-align: center;
    margin-top: 20px;
}
</style>