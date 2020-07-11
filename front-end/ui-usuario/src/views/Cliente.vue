<template>
    <div class="container">

        
                <table class="table" v-if="!editar">
                    

                    <thead>
                        <tr>
                        
                      
                        <th scope="col">Nombre </th>
                        <th scope="col">Apellidos </th>
                        <th scope="col">Telefono </th>
                        <th scope="col">email </th>
                        <th scope="col">Codigo Postal </th>
                        <th scope="col">Paìs </th>
                        <th scope="col">Provincia </th>
                        <th scope="col">Canton </th>
                        <th scope="col">Distrito </th>
                        <th scope="col">Direccion </th>
                        <th scope="col">Acciones </th>
                        

                       

                <!--         <th scope="col">Direccion</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Acciones</th> -->
                        
                        
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
            <td> <b-button @click="eliminarCliente(item.id_Clientes)" class="btn-danger btn-sm" >Eliminar</b-button></td>
             <td> <b-button @click="activarEdicion(item.id_Usuario)" class="btn-warning btn-sm" >Editar</b-button></td>
           

          </tr>
            
        </tbody>
 </table>
        <form  >
                    <h3>Agregar</h3>

                    <input type="text" class="form-control my-2" placeholder="Cedula" v-model="clientes.id_Clientes">

                    

                    <input type="text" class="form-control my-2" placeholder="Nombre" v-model="clientes.nombre" >
                    <input type="text" class="form-control my-2" placeholder="Apellidos" v-model="clientes.apellidos">
                    <input type="text" class="form-control my-2" placeholder="Telefono" v-model="clientes.telefono" >
                    <input type="text" class="form-control my-2" placeholder="Codigo Postal" v-model="clientes.codigopostal" >
                    <input type="text" class="form-control my-2" placeholder="Pais" v-model="clientes.pais" >
                    <input type="text" class="form-control my-2" placeholder="Provincia" v-model="clientes.provincia" >
                    <input type="text" class="form-control my-2" placeholder="Canton" v-model="clientes.canton" >
                    <input type="text" class="form-control my-2" placeholder="Distrito" v-model="clientes.distrito" >
                    <input type="text" class="form-control my-2" placeholder="Direccion" v-model="clientes.direccionexacta" >
                    
                   
                    <br>
                    <b-button class="btn-success my-2" type="submit" @click.prevent="agregarCliente">Agregar</b-button>

                </form>


                <form v-if="editar">
                    <h3>Editar Cliente</h3>

                    
                    
                    <input type="text" class="form-control my-2" placeholder="Nombre" v-model="clienteEditar[0].nombre" >
                    <input type="text" class="form-control my-2" placeholder="Apellidos" v-model="clienteEditar[0].apellidos">
                    <input type="text" class="form-control my-2" placeholder="Telefono" v-model="clienteEditar[0].telefono" >ç
                   
                    <input type="text" class="form-control my-2" placeholder="Codigo Postal" v-model="clienteEditar[0].codigopostal" >
                    <input type="text" class="form-control my-2" placeholder="Pais" v-model="clienteEditar[0].pais" >
                    <input type="text" class="form-control my-2" placeholder="Provincia" v-model="clienteEditar[0].provincia" >
                    <input type="text" class="form-control my-2" placeholder="Canton" v-model="clienteEditar[0].canton" >
                    <input type="text" class="form-control my-2" placeholder="Distrito" v-model="clienteEditar[0].distrito" >
                    <input type="text" class="form-control my-2" placeholder="Direccion" v-model="clienteEditar[0].direccionexacta" >
                    
                   
                    <br>
                    <b-button class="btn-success my-2" type="submit" @click.prevent="editarCliente(clienteEditar[0].id_Clientes)">Editar</b-button>
                    <br>
                    <b-button class=" my-2 " type="submit" v-on:click="editar=false">Cancelar</b-button>
                </form>



    </div>
        
   
    
</template>

<script>
  import firebase from 'firebase';
export default {
 
    data(){

        return{

            mail:"",
            mas:false,
            users:[],
            clienteEditar:{},
            cliente:[],
            clientes:{
                id_Clientes:"",
                nombre:"",
                apellidos:"",
                telefono:"",
                email:"",
                codigopostal:"",
                pais:"",
                provincia:"",
                canton:"",
                distrito:"",
                direccionexacta:""
            }


        }
    },
    created(){
        this.listarClientes();
       
         firebase.auth().onAuthStateChanged(user =>{
          
            this.users=user;
            if(this.cliente.email==this.users.email){
                this.listarCategoria(this.cliente.email)
            }
            
          
        
      });
       
    },
    methods:{

         editarCliente: function(id){
         console.log("entra a editar");
        fetch(`http://localhost:3000/modificarClientes/${id}`, {
                method: 'PUT', // or 'PUT'
                headers:{
                    'Content-Type': 'application/json'
                },
               body: JSON.stringify({id_Clientes:this.clienteEditar.id_Clientes,nombre:`${this.clienteEditar[0].nombre}`
                ,apellidos:`${this.clienteEditar[0].apellidos}`,
                telefono:`${this.clienteEditar[0].telefono}`,
                email:`${this.users.email}`,codigopostal:`${this.clienteEditar[0].codigopostal}`,pais:`${this.clienteEditar[0].pais}`
                ,provincia:`${this.clienteEditar[0].provincia}`,canton:`${this.clienteEditar[0].canton}`,distrito:`${this.clienteEditar[0].distrito}`,direccionexacta:`${this.clienteEditar[0].direccionexacta}`
                }), // data can be `string` or {object}!
                })
                location.reload();
     },
     listarCliente(){
        
    console.log("aquiii");
            this.mail=this.clientes.email;
            console.log(this.mail);
            fetch(`http://localhost:3000/listarClientes/`,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{console.log(data)
            this.cliente=data})
            .catch(e=>{
                console.log(e.response);
            })
     },

        eliminarCliente(id){
            console.log("ENTRA");
       console.log(id);
        fetch(`http://localhost:3000/eliminarClientes/${id}`,{
            method: 'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
            })
        .then(res => {

            const index = this.cliente.findIndex(item => item.id_Clientes === res.data.id_Clientes );
            this.cliente.splice(index, 1);
            

        })
        .catch(e => {
            console.log(e.response);
        })
        location.reload();
   },
         agregarCliente: function(){

         fetch('http://localhost:3000/agregarCliente', {
                method: 'POST', // or 'PUT'
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id_Clientes:this.clientes.id_Clientes,
                contrasenna:`${this.clientes.contrasenna}`,nombre:`${this.clientes.nombre}`
                ,apellidos:`${this.clientes.apellidos}`,
                telefono:`${this.clientes.telefono}`,email:`${this.user.email}`,codigopostal:`${this.clientes.codigopostal}`,pais:`${this.clientes.pais}`
                ,provincia:`${this.clientes.provincia}`,canton:`${this.clientes.canton}`,distrito:`${this.clientes.distrito}`,direccionexacta:`${this.clientes.direccionexacta}`
                }), // data can be `string` or {object}!
                })
                .then(res=>res.json())
                .then(data=>console.log(data))

                location.reload();
                        
     }, 
        listarCategoria(email){
                console.log("aquiii");
            this.mail=this.clientes.email;
            console.log(this.mail);
            fetch(`http://localhost:3000/consultarCorreo/'${email}'`,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{console.log(data)
            this.cliente=data})
            .catch(e=>{
                console.log(e.response);
            })
        },
        
    },
    

    
    mounted(){
        this.listarCategoria()
    }
    
}
</script>