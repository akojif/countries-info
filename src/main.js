import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMeta from "vue-meta"
import "./registerServiceWorker";
import "@/components";
import Fragment from "vue-fragment";
import VueSkeletonLoading from "vue-skeleton-loading";

Vue.use(Fragment.Plugin);
Vue.use(VueSkeletonLoading);
Vue.use(VueMeta)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
