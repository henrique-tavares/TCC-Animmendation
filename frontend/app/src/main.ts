import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";
import { emitterKey, emitter } from "./providers/emitterProvider";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./providers/apolloClientProvider";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.provide(DefaultApolloClient, apolloClient);
app.provide(emitterKey, emitter);

app.mount("#app");
