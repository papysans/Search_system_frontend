// Search_system/src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";

const routes = [
    { path: "/", name: "Login", component: Login },
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = () => {
        const user = localStorage.getItem("user");
        return user && JSON.parse(user).id; // 确保用户数据包含id
    };

    if (to.meta.requiresAuth && !isAuthenticated()) {
        next({ name: "Login" });
    } else if (to.name === "Login" && isAuthenticated()) {
        next({ name: "Home" }); // 如果已登录，尝试访问登录页会重定向到首页
    } else {
        next();
    }
});

export default router;
