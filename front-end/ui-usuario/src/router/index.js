import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue")
    },

    {
        path: '/getCategoria',
        name: 'getCategoria',

        component: () =>
            import ("../views/Categoria.vue")

    },

    {
        path: '/getCliente',
        name: 'getCliente',

        component: () =>
            import ("../views/Cliente.vue")

    },
    {
        path: '/getPedido',
        name: 'getPedido',

        component: () =>
            import ("../views/pedido.vue")

    },
    {
        path: '/getProducto',
        name: 'getProducto',

        component: () =>
            import ("../views/producto.vue")

    },
    {
        path: '/getStock',
        name: 'getStock',

        component: () =>
            import ("../views/stock.vue")

    }, {
        path: '/getCarrito',
        name: 'Carrito',

        component: () =>
            import ("../views/Carrito.vue")

    }


];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;