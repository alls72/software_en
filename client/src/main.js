import Vue from 'vue';
import App from './App.vue';
import router from "@/router.js";
import VueFlashMessage from 'vue-flash-message';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueFlashMessage);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
