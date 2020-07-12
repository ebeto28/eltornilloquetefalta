<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h3 class="title is-3">El Tornillo</h3>
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        :class="{'is-active':isOpen}"
        @click.prevent="toggleMenu"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active':isOpen}">
      <div v-if="userid" class="navbar-start">
        <router-link class="navbar-item" to="/getCliente">
          <v-icon large>home</v-icon>
        </router-link>
        <router-link class="navbar-item" to="/getProducto">
          <v-icon>widgets</v-icon>
        </router-link>
        <router-link class="navbar-item" to="/getCarrito">
          <span class="material-icons">shopping_cart</span>
        </router-link>
      </div>

     

      <div class="navbar-end">
        <div class="navbar-item">
          <template v-if="user">
            <div class="navbar-item has-dropdown is-hoverable border border-info rounded">
              <a class="navbar-link">
                <span class="material-icons">perm_identity</span>
                {{user.email}}
                <!--  {{user.displayName}} -->
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item" @click.prevent="logout">
                  <span class="material-icons">settings_power</span>
                  Cerrar Sesion
                </a>

                <!--          
                <a class="navbar-item">Cerrar Sesion</a>-->

                <!--      
                    <a class="navbar-item">Contact</a>
                    <hr class="navbar-divider" />
                <a class="navbar-item">Report an issue</a>-->
              </div>
            </div>
          </template>

          <template v-else>
            <div class="buttons">
              <router-link class="button is-primary" to="/register">
                <strong>Registrarme</strong>
              </router-link>

              <router-link class="button is-light" to="/login">
                <strong>Ingresar</strong>
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";
import { mapMutations, mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isOpen: false,
      user: null,
      userid: false
    };
  },
  methods: {
    toggleMenu() {
      const status = !this.isOpen;
      this.isOpen = status;
    },

    listarMostrar() {
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
          this.userid = true;
        })
        .catch(e => {
          this.userid = false;
          console.log(e.response);
        });

    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.limpiarEmail();
          this.limpiarId();
          this.$router.push({ name: "login" });
        });
    },

    ...mapMutations(["registrarEmail", "limpiarEmail"]),
    ...mapMutations(["registrarId", "limpiarId"])
  },
  created() {
    this.listarMostrar();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },

  computed: {
    ...mapState(["idemail"]),
    ...mapGetters(["getemail"]),
    ...mapState(["id"]),
    ...mapGetters(["getid"])
  }
};
</script>