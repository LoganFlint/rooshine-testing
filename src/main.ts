import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import "@fontsource/pt-serif/latin-400.css";
import "@fontsource/pt-serif/latin-700.css";
import "@fontsource/source-sans-pro/latin-200.css";
import "@fontsource/source-sans-pro/latin-300.css";
import "@fontsource/source-sans-pro/latin-400.css";
import "@fontsource/source-sans-pro/latin-600.css";
import "@fontsource/source-sans-pro/latin-700.css";

const app = createApp(App)
app.use(router)
app.use(createPinia());
app.mount("#app")
