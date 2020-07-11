import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from 'bootstrap-vue';
import Vuetify from 'vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // 
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using 

Vue.use(Vuetify);
Vue.use(Vuetify, {
    iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");