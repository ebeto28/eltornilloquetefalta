import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from 'bootstrap-vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuetify);


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(axios,VueAxios);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'


let app = null;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})

