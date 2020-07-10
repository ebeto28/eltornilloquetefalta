<template>
<div>
    <v-card
    class="mx-auto"
    max-width="400" 
    v-for="(item, index) in producto" :key="index"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>Top 10 Australian beaches</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0" >e</v-card-subtitle>

    <v-card-text class="text--primary">
      <div></div>

      <div >{{producto.nombre}}</div>
    </v-card-text>

    <v-card-actions >
     
      <v-btn
        color="orange"
        text
      >
        Agregar a Carrito
      </v-btn>
    </v-card-actions>
  </v-card>

    
      
  </div>

</template>

<script>

import 'vuetify/dist/vuetify.min.css' ;

export default {
    data(){
        return{
            producto:[]


        }
    },
    created(){
        this.listarProducto();
    },
    methods:{
        listarProducto(){

           this.axios.get(`http://localhost:3000/listarProducto`)
            .then(res=>res.json())
            .then(data=>{console.log(data)
            this.producto=data})
            .catch(e=>{
                console.log(e.response);
            })
        }
    },
    mounted(){
        this.listarProducto()
    }
    
}
</script>