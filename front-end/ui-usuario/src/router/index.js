import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import About from "../views/About.vue";
import Articulos from "../views/articulos.vue";





import firebase from 'firebase';


Vue.use(VueRouter);

const router= new VueRouter({

 routes : [
  {
    path: "/",
    name: "home",
    component: Home,
  /*   meta:{
      requiresAuth:true
    } */
  },
  {
    path: "/Login",
    name: "login",
    component: Login
  },
  {
    path: "/Register",
    name: "register",
    component: Register
  },
  {
    path: "/articulos",
    name: "articulos",
    component: Articulos
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
      meta:{
      requiresAuth:true
    } 
  },
  {
    path: "/About",
    name: "About",
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   /*  component: () =>
      import(/* webpackChunkName: "about" * "../views/About.vue") */
  },
  
  {
    path: '/getCategoria',
    name: 'getCategoria',

    component: () =>import("../views/Categoria.vue")

  },

  {
    path: '/getCliente',
    name: 'getCliente',

    component: () =>import("../views/Cliente.vue")

  },
  {
    path: '/getPedido',
    name: 'getPedido',

    component: () =>import("../views/pedido.vue")

  },
  {
    path: '/getProducto',
    name: 'getProducto',

    component: () =>import("../views/producto.vue")

  },
  {
    path: '/getStock',
    name: 'getStock',

    component: () =>import("../views/stock.vue")

  }



]
});

/* const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
}); */


router.beforeEach((to, from, next)=>{
  if(to.matched.some(ruta=>ruta.meta.requiresAuth)){
    const user = firebase.auth().currentUser;
    if (user) {
      next();
      
    }else{
      next({
        name: 'login'
      })
    }
  }else{
    next();
  }


})

export default router;
