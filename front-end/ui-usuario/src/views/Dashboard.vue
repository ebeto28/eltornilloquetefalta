<template>
    <div id="app">
        <div id="nav">
        <router-link to="/">Incio</router-link>|
        <router-link to="/about">Acerca de</router-link>|
        <router-link to="/getCategoria">Categoria</router-link>|
        <router-link to="/getStock">Stock</router-link>|
        <router-link to="/getCliente">Clientes</router-link>|
        <router-link to="/getProducto">Productos</router-link>|
        <router-link to="/getPedido">Pedidos</router-link>|
        <router-link to="/getPrueba">Prueba</router-link>
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>|
        <router-link to="/articulos">Articulos</router-link>|
        </div>
        <router-view />


      


<!--         <template v-if="user">
            
                <a>
                        {{user.email}}
                    
                   
                </a>

                <template>>
 -->
    </div>





</template>
<script>
/* import {mapMutations, mapGetters} from 'vuex';
import {mapState} from 'vuex';
 */
export default {

    name:"test",
    data() {
     
        return {
            
            
        }
    },
    created() {
        this.verVariable();
    },
    methods: {
        verVariable(){
            console.log('||'); 
             console.log('V'); 
             console.log( "una pa;abra",`${this.$store.state.idemail}`); 

        }
                        
        
    },/* 
    computed: {
        ...mapState(['idemail']),
        ...mapGetters(['getemail'])

    }
 */
};
</script>