import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idemail: localStorage.getItem('email')
  },
  mutations: {
    registrarEmail(state,email){
      localStorage.setItem('email',`${email}`);
      state.idemail= localStorage.getItem('email');
    },
    limpiarEmail(state){
      state.idemail='';
      localStorage.removeItem('email');
    }
  },
  actions: {},
  modules: {},
  getters:{
    getemail: st=>{
      return st.idemail;
    }
  }
});
