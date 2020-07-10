



<template>
  <div class="container">
    <div class="row">
      <!-- Elementos generados a partir del JSON -->
      <main id="items" class="col-sm-8 row"></main>
      <!-- Carrito -->
      <aside class="col-sm-4">
        <h2>Carrito</h2>
        <!-- Elementos del carrito -->
        <ul id="carrito" class="list-group"></ul>
        <hr />
        <!-- Precio total -->
        <p class="text-right">
          Total:
          <span id="total"></span>&euro;
        </p>
        <button id="boton-vaciar" class="btn btn-danger">Vaciar</button>
      </aside>
    </div>
  </div>
</template>






<script>
let $items = document.querySelector("#items");
/*
let carrito = [];
let total = 0;
let $carrito = document.querySelector("#carrito");
let $total = document.querySelector("#total");
let $botonVaciar = document.querySelector("#boton-vaciar");
 */
let producto= [] ;
export default {
  data() {
    return {
      producto: []
    };
  },
  created() {
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
          console.log(data);
          this.producto = data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    renderItems() {
      for (let info of producto) {
        // Estructura
        let miNodo = document.createElement("div");
        miNodo.classList.add("card", "col-sm-4");
        // Body
        let miNodoCardBody = document.createElement("div");
        miNodoCardBody.classList.add("card-body");
        // Titulo
        let miNodoTitle = document.createElement("h5");
        miNodoTitle.classList.add("card-title");
        miNodoTitle.textContent = info["nombre"];
        // Imagen
        let miNodoImagen = document.createElement("img");
        miNodoImagen.classList.add("img-fluid");
        miNodoImagen.setAttribute("src", info["imagen"]);
        // Precio
        let miNodoPrecio = document.createElement("p");
        miNodoPrecio.classList.add("card-text");
        miNodoPrecio.textContent = info["precio"] + "€";
        // Boton
        let miNodoBoton = document.createElement("button");
        miNodoBoton.classList.add("btn", "btn-primary");
        miNodoBoton.textContent = "+";
        miNodoBoton.setAttribute("marcador", info["id"]);
      /*   miNodoBoton.addEventListener("click", anyadirCarrito); */
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        $items.appendChild(miNodo);
      }
    }
  },
  mounted() {
    this.listarProducto();
    this.renderItems();
  }
};
</script>




