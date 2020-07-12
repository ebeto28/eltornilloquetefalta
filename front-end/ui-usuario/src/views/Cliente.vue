<template>
  <div class="container">
    <v-card
    max-width="400"
    class="mx-auto"
    v-for="(item, index) in cliente" :key="index"
  >
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#189171"
            dark
          >
            <v-card-title class="headline"><b>{{item.nombre  }} {{item.apellidos }}</b></v-card-title>
            
            <v-card-subtitle> <b>Contacto:</b></v-card-subtitle>

            <v-card-subtitle>Telefono: {{item.telefono}}</v-card-subtitle>
            <v-card-subtitle>E-mail: {{item.email}}</v-card-subtitle>
            <v-card-subtitle><b>Direccion:</b></v-card-subtitle>
            <v-card-subtitle>{{item.pais}},{{item.provincia}},{{item.canton}}, {{item.distrito}}, {{item.direccionexacta}},{{item.codigopostal}}</v-card-subtitle>
            

            <v-card-actions>
              
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

    
    <form v-if="mostraragregar">
      <h3>Agregar</h3>

      <input
        type="number"
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
        type="number"
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
        class="button is-primary"
        type="submit"
        @click="agregarCliente(), mostraragregar=false"
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

      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="cliente[0].nombre" />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Apellidos"
        v-model="cliente[0].apellidos"
      />
      <input
        type="number"
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
      <input type="text" class="form-control my-2" placeholder="Pais" v-model="cliente[0].pais" />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Provincia"
        v-model="cliente[0].provincia"
      />
      <input type="text" class="form-control my-2" placeholder="Canton" v-model="cliente[0].canton" />
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
        class="button is-primary"
        type="submit"
        @click.prevent="editarCliente(cliente[0].id_Clientes)"
      >Guardar</b-button>
      
      <br />
    </form>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex';
import {mapState} from 'vuex';
import "vuetify/dist/vuetify.min.css";

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
          this.registrarId(this.cliente[0].id_Clientes);
          this.mostrareditar = true;
           
        })
        .catch(e => {
          this.mostraragregar = true;
          console.log(e.response);
        });
        
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
    this.listarCategoria();
  }
};
</script>