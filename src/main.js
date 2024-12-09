import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Particles from "vue3-particles";

const app = createApp(App);
app.use(router);
app.mount("#app");
app.use(Particles);
