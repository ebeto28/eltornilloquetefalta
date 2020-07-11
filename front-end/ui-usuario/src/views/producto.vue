<template>
  <div>
    <!-- TABLA CARRITO -->
    <table class="table" v-if="mostrarCarrito">
      <thead>
        <tr>
          <th scope="col">Producto</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio</th>
          <th scope="col">Subtotal</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in carrito" :key="index">
          <td>{{item.nombre}}</td>

          <td>
            <span v-if="formActualizar2 && idActualizar == index">
              <!-- Formulario para actualizar -->
              <input
                v-model="item.cantidad"
                v-bind:likes="item.cantidad"
                type="text"
                class="form-control"
              />
            </span>
            <span v-else>
              <!-- Dato nombre -->
              {{item.cantidad}}
            </span>
          </td>
          <td>{{item.precio}}</td>
          <td>{{item.subtotal}}</td>
          <td>
            <span v-if="formActualizar2 && idActualizar == index">
              <button
                @click="modificarCarrito(item.id_Transaccion, item.cantidad)"
                class="btn btn-success"
              >Guardar</button>
            </span>
            <span v-else>
              <!-- Botón para mostrar el formulario de actualizar -->
              <button @click="verFormActualizar(index)" class="btn btn-warning">Actualizar</button>
            </span>
          </td>
          <td>
            <b-button @click="eliminarCarrito(item.id_Transaccion)" class="btn-danger">Eliminar</b-button>
          </td>
        </tr>
      </tbody>
      <span>
        <h3></h3>
      </span>
    </table>
    <!-- TARJETA DESCRIPCION -->
    <div v-if="mostrardescripcion">
      <v-card class="mx-auto" max-width="400" v-for="(item, index) in producto" :key="index">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>Top 10 Australian beaches</v-card-title>
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
            </div>
          </div>

          <v-btn
            color="orange"
            text
            @click="agregarCarrito(item.id_Producto,selected), modificarStock(item.id_Stock, item.id_Producto, selected)"
          >Agregar a Carrito</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <!-- TARJETAS PRODUCTOS -->
    <div v-if="!mostrardescripcion && !mostrarCarrito">

      <DIV>
        <h1>{{this.$store.state.idemail}}</h1>
      
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

                <v-card-subtitle class="pb-0">{{card.id_Producto}}</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>{{card.descripcion}}</div>
                  <div>{{card.precio}}</div>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <div class="text--primary">AGREGAR AL CARRITO</div>
                  <v-btn icon @click="consultarProducto(card.id_Producto), mostrarlista=false, mostrardescripcion=true">
                    <v-icon>mdi-bookmark</v-icon>
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


export default {
  data() {
    return {
      producto: [],
      usuario: [],
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
      selected: ""
    };
  },
  created() {
    this.listarProducto();
    this.listarCarrito();
    this.verVariable();
  },
  methods: {
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
    eliminarCarrito(id) {
      console.log("ENTRA");
      console.log(id);
      fetch(`http://localhost:3000/eliminarCarrito/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
        
      })
        .then(res => {
          const index = this.carrito.findIndex(
            item => item.id_Transaccion === res.data.id_Transaccion
          );
          this.carrito.splice(index, 1);
        })
        .catch(e => {
          console.log(e.response);
        });
      location.reload();
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
    agregarCarrito: function(id, cantidad) {
      console.log(id);
      console.log(cantidad);
      fetch("http://localhost:3000/agregarCarrito", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_Cliente: "8",
          id_Producto: id,
          cantidad: cantidad
        }) // data can be `string` or {object}!
      })
        .then(res => res.json())
        .then(data => console.log(data));

      location.reload();
    },
    listarCarrito() {
      fetch("http://localhost:3000/listarCarrito", {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.carrito = data;
          console.log(data);
        })
        .catch(e => {
          console.log(e.response);
        });
    }
  },
  mounted() {
    this.listarProducto();
    this.listarCarrito();
  }
};
</script>