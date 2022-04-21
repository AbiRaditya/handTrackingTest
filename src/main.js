import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import VueGoodTablePlugin from "vue-good-table";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "vue-good-table/dist/vue-good-table.css";
import './assets/tailwind.css'
// import EasyCamera from "easy-vue-camera";

Vue.config.productionTip = false;
Vue.use(VueGoodTablePlugin);
// Vue.use(EasyCamera);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
