<template>
  <div class="container">
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
                type="number"
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
                class="button is-primary"
              >Guardar</button>
            </span>
            <span v-else>
              <!-- Botón para mostrar el formulario de actualizar -->
              <button @click="verFormActualizar(index)" class="button is-primary">Actualizar</button>
            </span>
          </td>
          <td>
            <b-button @click="eliminarCarrito(item.id_Transaccion)" class="btn-danger" > Eliminar</b-button>
          </td>
        </tr>
      </tbody>
      <span>
        
        <input
        type="text"
        disabled="validated ? disabled"
        class="form-control my-2"
        placeholder="Total"
        v-model="this.total[0].suma"
      />

      </span>
    </table>


  </div>
</template>

<script>


import {mapMutations, mapGetters} from 'vuex';
import {mapState} from 'vuex';

export default {
  data() {
    return {
      producto: [],
      total:[],
      usuario: [],
      cliente: [],
      use: [],
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
      carritos: {
        id_Cliente: "",
        id_Producto: "",
        cantidad: "",
        subtotal: "",
        idActualizar: -1
      },
      mostrarCarrito: true,
      mostrarlista: false,
      mostrardescripcion: false,
      selected: "",
      id:0

      
    };
  },
  created() {
    
    this.listarCliente();
    this.listarTotal();
    this.listarCarrito();
    this.listarProducto();
    
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
          this.productos = data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    
   listarCliente() {
      fetch(`http://localhost:3000/listarClientes`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          
           this.cliente = data;
          
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    listarCarrito()  {
      
        fetch(`http://localhost:3000/listarCarrito/${this.$store.state.id}`, {
        method: "GET",
         
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          
          this.carrito = data;
          console.log(this.carrito);
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    
    verFormActualizar: function(id) {
      this.idActualizar = id;
      this.formActualizar2 = true;
    },
    listarTotal()  {
      
        fetch(`http://localhost:3000/listarTotal/${this.$store.state.id}`, {
        method: "GET",
         
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          
          this.total = data;
          console.log(this.total);
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
    limpiarId(){
      this.limpiarId();
    },
    ...mapMutations(['registrarId','limpiarId'])
  },
  computed: {
        ...mapState(['id']),
        ...mapGetters(['getid'])

    },

  mounted() {
    this.listarCarrito();
    this.listarCliente();
  }
};
</script>