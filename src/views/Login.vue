<template>
    <div class="login-container">
        <div v-if="showLogoutMessage" class="logout-message">已退出登录</div>
        <div class="login-box">
            <h2>毕业设计课题查询系统</h2>
            <LoginForm @login-success="onLoginSuccess" />
        </div>
        <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"
            :options="data.options" />
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import { loadFull } from "tsparticles"
import { reactive } from 'vue'

const router = useRouter()
const route = useRoute()
const showLogoutMessage = ref(false)

const onLoginSuccess = () => {
    router.push({ name: 'Home' })
}

onMounted(() => {
    if (route.query.logout === 'true') {
        showLogoutMessage.value = true
        setTimeout(() => {
            showLogoutMessage.value = false
        }, 3000) // 3秒后自动隐藏
    }
})

const data = reactive({
    options: {
        fpsLimit: 100,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "grab",
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 500,
                    duration: 2,
                    opacity: 0.6,
                    size: 10,
                },
                push: {
                    quantity: 2,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 2,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: true,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    value_area: 1000,
                },
                value: 60,
            },
            opacity: {
                value: 1,
            },
            shape: {
                type: "circle",
            },
            size: {
                random: true,
                value: 4,
            },
        },
        detectRetina: true,
    },
})

// 粒子效果
const particlesInit = async (engine) => {
    await loadFull(engine)
}
const particlesLoaded = async (container) => {
    console.log("Particles container loaded", container)
}

</script>

<style scoped>
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

.login-container {
    overflow: hidden;

    position: relative;
    height: 99vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
}

.login-container::before {
    overflow: hidden;

    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    background-image: url('../../public/pic/pic1.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(5px);
    z-index: -1;
}

.login-box {

    position: relative;
    z-index: 1;
    width: 500px;
    padding: 40px;
    background: rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
}

.login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center; 
}

.logout-message {
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #eab208b4;
    color: #000;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    text-align: center;
    animation: fadeIn 0.3s ease-in;
    z-index: 1000;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -20px);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}
</style>