import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./assets/css/index.css";
import axios from "../src/router/axios";

import VueAxios from "vue-axios";

import VueSSE from "vue-sse";

// using defaults
Vue.use(VueSSE);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
