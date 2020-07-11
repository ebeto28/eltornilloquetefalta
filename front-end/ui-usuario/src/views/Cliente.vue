<template>
  <div class="container">
    <h1>{{this.$store.state.idemail}}</h1>
    <table class="table" v-if="!editar">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Telefono</th>
          <th scope="col">email</th>
          <th scope="col">Codigo Postal</th>
          <th scope="col">Paìs</th>
          <th scope="col">Provincia</th>
          <th scope="col">Canton</th>
          <th scope="col">Distrito</th>
          <th scope="col">Direccion</th>
          <th scope="col">Acciones</th>

          <!--         <th scope="col">Direccion</th>
                        <th scope="col">Foto</th>
          <th scope="col">Acciones</th>-->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cliente" :key="index">
          <td>{{item.nombre}}</td>
          <td>{{item.apellidos}}</td>
          <td>{{item.telefono}}</td>
          <td>{{item.email}}</td>
          <td>{{item.codigopostal}}</td>
          <td>{{item.pais}}</td>
          <td>{{item.provincia}}</td>
          <td>{{item.canton}}</td>
          <td>{{item.distrito}}</td>
          <td>{{item.direccionexacta}}</td>
          <td>
            <b-button @click="eliminarCliente(item.id_Clientes)" class="btn-danger btn-sm">Eliminar</b-button>
          </td>
          <td>
            <b-button @click="activarEdicion(item.id_Usuario)" class="btn-warning btn-sm">Editar</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <form v-if="mostraragregar">
      <h3>Agregar</h3>

      <input
        type="text"
        class="form-control my-2"
        placeholder="Cedula"
        v-model="clientes.id_Clientes"
      />

      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="clientes.nombre" />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Apellidos"
        v-model="clientes.apellidos"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Telefono"
        v-model="clientes.telefono"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Email"
        v-model="this.$store.state.idemail"
        disabled="validated ? disabled"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Codigo Postal"
        v-model="clientes.codigopostal"
      />
      <input type="text" class="form-control my-2" placeholder="Pais" v-model="clientes.pais" />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Provincia"
        v-model="clientes.provincia"
      />
      <input type="text" class="form-control my-2" placeholder="Canton" v-model="clientes.canton" />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Distrito"
        v-model="clientes.distrito"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Direccion"
        v-model="clientes.direccionexacta"
      />

      <br />
      <b-button
        class="btn-success my-2"
        type="submit"
        @click.prevent="agregarCliente(), mostraragregar=false"
      >Agregar</b-button>
    </form>

    <form v-if="mostrareditar">
      <h3>Editar Cliente</h3>

      <input
        type="text"
        disabled="validated ? disabled"
        class="form-control my-2"
        placeholder="Nombre"
        v-model="cliente[0].id_Clientes
        "
      />

      <input
        type="text"
        class="form-control my-2"
        placeholder="Nombre"
        v-model="cliente[0].nombre"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Apellidos"
        v-model="cliente[0].apellidos"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Telefono"
        v-model="cliente[0].telefono"
      />
      <input
        type="text"
         disabled="validated ? disabled"
        class="form-control my-2"
        placeholder="Email"
        v-model="cliente[0].email"
      />
      
      <input
        type="text"
        class="form-control my-2"
        placeholder="Codigo Postal"
        v-model="cliente[0].codigopostal"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Pais"
        v-model="cliente[0].pais"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Provincia"
        v-model="cliente[0].provincia"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Canton"
        v-model="cliente[0].canton"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Distrito"
        v-model="cliente[0].distrito"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Direccion"
        v-model="cliente[0].direccionexacta"
      />

      <br />
      <b-button
        class="btn-success my-2"
        type="submit"
        @click.prevent="editarCliente(cliente[0].id_Clientes)"
      >Editar</b-button>
      <br />
       </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mail: "",
      mas: false,
      users: [],
      clienteEditar: {},
      cliente: [],
      clientes: {
        id_Clientes: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        codigopostal: "",
        pais: "",
        provincia: "",
        canton: "",
        distrito: "",
        direccionexacta: ""
      },
      mostraragregar: false,
      mostrareditar:false
    };
  },
  created() {
    this.listarCategoria();
  },
  methods: {
    editarCliente: function(id) {
      console.log("entra a editar");
      fetch(`http://localhost:3000/editarClientes/${id}`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: `${this.cliente[0].nombre}`,
          apellidos: `${this.cliente[0].apellidos}`,
          telefono: `${this.cliente[0].telefono}`,
          codigopostal: `${this.cliente[0].codigopostal}`,
          pais: `${this.cliente[0].pais}`,
          provincia: `${this.cliente[0].provincia}`,
          canton: `${this.cliente[0].canton}`,
          distrito: `${this.cliente[0].distrito}`,
          direccionexacta: `${this.cliente[0].direccionexacta}`
        }) // data can be `string` or {object}!
      });
      location.reload();
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

    nuevosdatos() {
      if (this.cliente) {
        this.mostraragregar = false;
        console.log("aqui1111");
      } else {
        this.mostraragregar = true;
      }
    },

    eliminarCliente(id) {
      console.log("ENTRA");
      console.log(id);
      fetch(`http://localhost:3000/eliminarClientes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          const index = this.cliente.findIndex(
            item => item.id_Clientes === res.data.id_Clientes
          );
          this.cliente.splice(index, 1);
        })
        .catch(e => {
          console.log(e.response);
        });
      location.reload();
    },
    agregarCliente: function() {
      console.log(this.clientes.id_Clientes);
      console.log(this.clientes.nombre);
      console.log(this.clientes.apellidos);
      console.log(this.clientes.telefono);
      console.log(this.clientes.codigopostal);
      console.log(this.clientes.pais);
      console.log(this.clientes.provincia);
      console.log(this.clientes.canton);
      console.log(this.clientes.distrito);
      console.log(this.clientes.direccionexacta);
      fetch("http://localhost:3000/agregarCliente", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_Clientes: this.clientes.id_Clientes,
          nombre: `${this.clientes.nombre}`,
          apellidos: `${this.clientes.apellidos}`,
          telefono: `${this.clientes.telefono}`,
          email: `${this.$store.state.idemail}`,
          codigopostal: `${this.clientes.pais}`,
          pais: `${this.clientes.provincia}`,
          provincia: `${this.clientes.canton}`,
          canton: `${this.clientes.distrito}`,
          distrito: `${this.clientes.distrito}`,
          direccionexacta: `${this.clientes.direccionexacta}`
        }) // data can be `string` or {object}!
      })
        .then(res => res.json())
        .then(data => console.log(data));

      location.reload();
    },
    listarCategoria() {
      console.log(this.$store.state.idemail);

      console.log("aquiii de listar");
      fetch(
        `http://localhost:3000/consultarCorreo/'${this.$store.state.idemail}'`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.cliente = data;
          this.mostrareditar = true;
           
        })
        .catch(e => {
          this.mostraragregar = true;
          console.log(e.response);
        });
    }
  },

  mounted() {
    this.listarCategoria();
  }
};
</script>