<template>
  <div>
    
    <!-- TARJETA DESCRIPCION -->
    <div v-if="mostrardescripcion">

      
      <v-card class="mx-auto" max-width="400" v-for="(item, index) in producto" :key="index">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title></v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">{{item.nombre}}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div></div>

          <div>{{item.descripcion}}</div>
        </v-card-text>

        <v-card-actions>
          <div class="form-group">
            <label for="docente">Cantidad</label>
            <div>
              <select v-model="selected" class="form-control">
                <option
                  v-for="option in item.cantidad"
                  :key="option"
                  v-bind:value="option"
                >{{ option }}</option>
              </select>
              <span></span>
            </div>
          </div>
          

          <v-btn 
            color="orange"
            text
            @click.prevent="agregarCarrito(item.id_Producto,selected), modificarStock(item.id_Stock, item.id_Producto, selected)"
          >Agregar a Carrito</v-btn>
          <span class="material-icons">
add_shopping_cart
</span>
        </v-card-actions>
      </v-card>
    </div>
    <!-- TARJETAS PRODUCTOS -->
    <div v-if="!mostrardescripcion ">

      <DIV>
      
      <v-card class="mx-auto" max-width="500">
        <v-toolbar color="indigo" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Discover</v-toolbar-title>

          <v-spacer></v-spacer>
              <div >
          </div>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container fluid>
          <v-row dense>
            <v-col v-for="card in productos" :key="card" cols="12">
              <v-card>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title>{{card.nombre}}</v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0">{{card.nombre}}</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>{{card.descripcion}}</div>
                  <div>{{card.precio}}/cd</div>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  
                  <v-btn  @click="consultarProducto(card.id_Producto), mostrarlista=false, mostrardescripcion=true">
                    <span class="material-icons">
info
</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </DIV>
    </div>
  </div>
</template>

<script>
import "vuetify/dist/vuetify.min.css";

import {mapMutations, mapGetters} from 'vuex';
import {mapState} from 'vuex';

export default {
  data() {
    return {
      producto: [],
      usuario: [],
      cliente: [],
      productos: [],
      stock: [],
      formActualizar2: false,
      carrito: [],
      clientes: {
        id_Clientes: "",
        contrasenna:"",
        nombre: "",
        apellidos: "",
        codigopostal: "",
        pais: "",
        provincia: "",
        canton: "",
        distrito: "",
        direccionexacta: "",
      },
      login: {
        id_Clientes: "",
        contrasenna:"",
        
      },
      carritos: {
        id_Cliente: "",
        id_Producto: "",
        cantidad: "",
        subtotal: "",
        idActualizar: -1
      },
      mostrarCarrito: false,
      mostrarlista: false,
      mostrardescripcion: false,
      selected: 0,
      total:0
    };
  },
  created() {
   
    this.listarProducto();
    this.listarCliente();
   
  },
  methods: {

    sumarTotal(){
      this.total="hola";
      console.log(this.total);
    }
    ,
   
    listarProducto() {
      fetch("http://localhost:3000/listarProducto", {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.productos = data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    verVariable(){
            console.log('||'); 
             console.log('V'); 
             console.log( "una pa;abra",`${this.$store.state.idemail}`); 

        },
    consultarProducto(id) {
      console.log("ENTRA");
      this.mostrardescripcion = true;

      fetch(`http://localhost:3000/consultarProducto/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.producto = data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    consultarClientes(id , contrasenna) {
      console.log(id, contrasenna);
      console.log("ENTRA");
      fetch(`http://localhost:3000/consultarClientes/${id}/'${contrasenna}'`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(data => {
          
          this.usuario = data;
          if(this.usuario){
            
              this.mostrarlista = true;
              this.mostrarLogin=false;
          }else{
            this.mostrarLogin=true;
          }
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    consultarStock() {
      console.log("ENTRA");

      fetch(`http://localhost:3000/consultarStock/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.stock = data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    modificarCarrito(id, cantidad) {
      console.log("ENTRA");
      console.log(id, cantidad);
      fetch(`http://localhost:3000/modificarCarrito/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_Transaccion: id,
          cantidad: cantidad
        })
      });
      location.reload();
    },
    modificarStock(id, id_Producto, cantidad) {
      console.log("ENTRA");
      console.log(id, cantidad);
      fetch(`http://localhost:3000/modificarStock/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_Producto: id_Producto,
          cantidad: cantidad
        })
      });
      location.reload();
    },
    verFormActualizar: function(id) {
      this.idActualizar = id;
      this.formActualizar2 = true;
    },
     listarCliente() {
      fetch(`http://localhost:3000/listarClientes/`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.cliente = data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    agregarCarrito: function(id, cantidad) {
      console.log(id);
      console.log(cantidad);
      console.log("------------------------");
      console.log(this.cliente.id_Clientes);
      fetch("http://localhost:3000/agregarCarrito", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_Clientes: this.$store.state.id,
          id_Producto: id,
          cantidad: cantidad
        }) // data can be `string` or {object}!
      })
        .then(res => res.json())
        .then(data => console.log(data));


    },
    
    limpiarId(){
      this.limpiarId();
    },
    ...mapMutations(['registrarId','limpiarId']),
    ...mapMutations(['registrarId','limpiarId'])
  },
  computed: {
        ...mapState(['id']),
        ...mapGetters(['getid']),
        ...mapState(['id']),
        ...mapGetters(['getid'])

    },
  mounted() {
    this.listarProducto();

    this.listarCliente();
  }
};
</script>