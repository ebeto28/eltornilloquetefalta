import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idemail: localStorage.getItem('email'),
        id: localStorage.getItem('id')
    },
    mutations: {
        registrarEmail(state, email) {
            localStorage.setItem('email', `${email}`);
            state.idemail = localStorage.getItem('email');
        },
        registrarId(state, id) {
            localStorage.setItem('id', `${id}`);
            state.id = localStorage.getItem('id');
        },
        limpiarEmail(state) {
            state.idemail = '';
            localStorage.removeItem('email');
        },
        limpiarId(state) {
            state.id = '';
            localStorage.removeItem('id');
        }
    },
    actions: {},
    modules: {},
    getters: {
        getemail: st => {
            return st.idemail;
        },
        getid: st => {
            return st.id;
        }
    }
});