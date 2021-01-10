import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/reset.css";
import "./assets/css/global.css";
import directives from "./common/directives";

const app = createApp(App);

app.use(directives);

app.mount("#app");
