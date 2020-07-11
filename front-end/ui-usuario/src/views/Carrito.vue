<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          
          <th scope="col">Producto</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio</th>
          <th scope="col">Subtotal</th>

          <!--         <th scope="col">Direccion</th>
                        <th scope="col">Foto</th>
          <th scope="col">Acciones</th>-->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in carrito" :key="index">
          <td>{{item.nombre}}</td>
          
          <td>
            <span v-if="formActualizar2 && idActualizar == index">
              <!-- Formulario para actualizar -->
              <input v-model="item.cantidad" v-bind:likes="item.cantidad" type="text" class="form-control" />
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
              <button @click="modificarCarrito(item.id_Transaccion, item.cantidad)" class="btn btn-success">Guardar</button>
            </span>
            <span v-else>
              <!-- Botón para mostrar el formulario de actualizar -->
              <button @click="verFormActualizar(index)" class="btn btn-warning">Actualizar</button>
             
            </span>
          </td>
          <td>
            <b-button
              @click="eliminarCarrito(item.id_Transaccion)"
              class="btn-danger "
            >Eliminar</b-button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formActualizar2: false,
      carrito: [],
      carritos: {
        id_Cliente: "",
        id_Producto: "",
        cantidad: "",
        subtotal: "",
        idActualizar: -1
      }
    };
  },
  created() {
    this.listarCarrito();
  },
  methods: {
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
      console.log(id);
      fetch(`http://localhost:3000/modificarCarrito/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_Transaccion: id,
          cantidad: cantidad
        })
      })
      location.reload();
    },
    verFormActualizar: function(id) {
      this.idActualizar = id;
      this.formActualizar2 = true;
    },
    agregarCarrito: function(id, cantidad) {
      fetch("http://localhost:3000/agregarCarrito", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
         id_Transaccion: id,
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
    this.listarCarrito();
  }
};
</script>